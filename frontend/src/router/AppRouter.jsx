import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import PageLoader from '@/components/PageLoader';

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Customer = lazy(() => import('@/pages/Customer'));
const Invoice = lazy(() => import('@/pages/Invoice'));
const Quote = lazy(() => import('@/pages/Quote'));
const PaymentInvoice = lazy(() => import('@/pages/PaymentInvoice'));
const Employee = lazy(() => import('@/pages/Employee'));
const Admin = lazy(() => import('@/pages/Admin'));
const Settings = lazy(() => import('@/pages/Settings/Settings'));
const PaymentMode = lazy(() => import('@/pages/PaymentMode'));
const Role = lazy(() => import('@/pages/Role'));
const Trends = lazy(() => import('@/pages/Trends'));
const Login = lazy(() => import('@/pages/Login'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Logout = lazy(() => import('@/pages/Logout'));
const Credit = lazy(() => import('@/pages/Credit'));
const PaymentReturn = lazy(() => import('@/pages/Payment/PaymentReturn'));
const Products = lazy(() => import('@/pages/Products'));
const Orders = lazy(() => import('@/pages/Orders'));
const Inventory = lazy(() => import('@/pages/Inventory'));
const MyWorks = lazy(() => import('@/pages/MyWorks'));
const Projects = lazy(() => import('@/pages/Projects'));
const UploadWork = lazy(() => import('@/pages/UploadWork'));
const ActiveProjects = lazy(() => import('@/pages/Projects/ActiveProjects'));
const CompletedProjects = lazy(() => import('@/pages/Projects/CompletedProjects'));
const ArchivedProjects = lazy(() => import('@/pages/Projects/ArchivedProjects'));

export default function AppRouter() {
  const location = useLocation();

  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence exitBeforeEnter initial={false}>
        <Switch location={location} key={location.pathname}>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path="/customer" component={Customer} />
          <PrivateRoute exact path="/invoice" component={Invoice} />
          <PrivateRoute exact path="/quote" component={Quote} />
          <PrivateRoute exact path="/payment/invoice" component={PaymentInvoice} />
          <PrivateRoute exact path="/employee" component={Employee} />
          <PrivateRoute exact path="/admin" component={Admin} />
          <PrivateRoute exact path="/settings" component={Settings} />
          <PrivateRoute exact path="/payment/mode" component={PaymentMode} />
          <PrivateRoute exact path="/role" component={Role} />
          <PrivateRoute exact path="/trends" component={Trends} />
          <PrivateRoute exact path="/products" component={Products} />
          <PrivateRoute exact path="/orders" component={Orders} />
          <PrivateRoute exact path="/inventory" component={Inventory} />
          <PublicRoute exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <PrivateRoute exact path="/credit" component={Credit} />
          <Route exact path="/payment/return" component={PaymentReturn} />
          <PrivateRoute exact path="/my-works" component={MyWorks} />
          <PrivateRoute exact path="/upload-work" component={UploadWork} />
          <PrivateRoute exact path="/projects" component={Projects} />
          <PrivateRoute exact path="/active-projects" component={ActiveProjects} />
          <PrivateRoute exact path="/completed-projects" component={CompletedProjects} />
          <PrivateRoute exact path="/archived-projects" component={ArchivedProjects} />
          <Route path="*" component={NotFound} />
        </Switch>
      </AnimatePresence>
    </Suspense>
  );
}
