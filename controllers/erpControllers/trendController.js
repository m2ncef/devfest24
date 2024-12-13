const trends = [
  {
    _id: '1',
    metric: 'Total Sales',
    current: 150000,
    previous: 120000,
    change: 25,
    trend: 'up',
    category: 'Revenue',
  },
  {
    _id: '2',
    metric: 'New Customers',
    current: 250,
    previous: 200,
    change: 25,
    trend: 'up',
    category: 'Customer',
  },
  {
    _id: '3',
    metric: 'Average Order Value',
    current: 600,
    previous: 650,
    change: -7.7,
    trend: 'down',
    category: 'Revenue',
  },
  {
    _id: '4',
    metric: 'Customer Satisfaction',
    current: 4.5,
    previous: 4.2,
    change: 7.1,
    trend: 'up',
    category: 'Customer',
  },
  {
    _id: '5',
    metric: 'Payment Processing Time',
    current: 2.5,
    previous: 3.2,
    change: -21.9,
    trend: 'down',
    category: 'Operations',
  },
];

exports.list = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      result: trends,
      message: 'Successfully found all trends',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      result: null,
      message: error.message,
    });
  }
};

module.exports = {
  list: exports.list,
};
