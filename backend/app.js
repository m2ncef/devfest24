const express = require('express');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: '.variables.env' });
const multer = require('multer');
const { generateImageContent } = require('./utils/imageCaptionAndTags');
const fs = require('fs').promises;

const erpApiRouter = require('./routes/erpRoutes/erpApi');
const erpAuthRouter = require('./routes/erpRoutes/erpAuth');
const erpDownloadRouter = require('./routes/erpRoutes/erpDownloadRouter');
const errorHandlers = require('./handlers/errorHandlers');
const { isValidAdminToken } = require('./controllers/erpControllers/authJwtController ');
const { fetchGoogleTrends } = require('./controllers/erpControllers/trendsController');
const { analyzeBusinessWithTechTrends } = require('./utils/trendRecommendations');
const axios = require('axios');
const Form = require('./models/erpModels/Form');

const app = express();

const corsOptions = {
  origin:
    process.env.NODE_ENV === 'production'
      ? process.env.FRONTEND_URL
      : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Allow-Headers',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers',
    'Access-Control-Allow-Credentials',
  ],
  exposedHeaders: ['Set-Cookie'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
  })
);
app.options('*', cors(corsOptions));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    return res.status(200).json({});
  }
  next();
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is working!' });
});

app.use('/api', erpAuthRouter);
app.post('/api/trends', fetchGoogleTrends);
app.use('/api', isValidAdminToken, erpApiRouter);
app.use('/download', erpDownloadRouter);

const ensureUploadsDir = async () => {
  try {
    await fs.access('uploads');
  } catch {
    await fs.mkdir('uploads');
  }
};
ensureUploadsDir();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  },
});

app.post(
  '/api/imageCaptionAndTags',
  upload.single('image'),
  isValidAdminToken,
  async (req, res) => {
    try {
      const { path } = req.file;
      console.log(`Processing image: ${path}`);

      const result = await generateImageContent(path);
      const parsedResult = JSON.parse(result);

      return res.status(200).json(parsedResult);
    } catch (error) {
      console.error('Error processing image:', error);
      return res.status(500).json({
        success: false,
        message: 'Error processing image',
        error: error.message || 'Unknown error occurred',
      });
    }
  }
);

app.post('/api/recommendations', async (req, res) => {
  try {
    const { accountType } = req.query;
    const recommendations = await analyzeBusinessWithTechTrends(accountType);
    return res.status(200).json(recommendations);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/predict', async (req, res) => {
  try {
    const { category, description, datestart, montestart, monthend } = req.body;

    if (!category || !datestart || !montestart || !monthend) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    const response = await axios.post(`${process.env.AI_SERVER_IP}/predict`, {
      category,
      description,
      datestart,
      montestart: parseFloat(montestart),
      monthend: parseFloat(monthend),
    });

    const prediction = {
      success: true,
      data: {
        aiPrediction: response.data,
        summary: {
          initialInvestment: parseFloat(montestart),
          targetRevenue: parseFloat(monthend),
          predictedSuccess: response.data.success_probability || 0,
          recommendedActions: response.data.recommendations || [],
        },
      },
    };

    await Form.create({
      category,
      description,
      datestart,
      montestart,
      monthend,
      aiPrediction: response.data,
    });

    return res.status(200).json(prediction);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error processing prediction request',
      error: error.message || 'Unknown error occurred',
    });
  }
});

app.use(errorHandlers.notFound);
app.use(
  app.get('env') === 'development'
    ? errorHandlers.developmentErrors
    : errorHandlers.productionErrors
);

module.exports = app;
