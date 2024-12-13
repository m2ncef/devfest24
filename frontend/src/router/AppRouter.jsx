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
          <PublicRoute exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <PrivateRoute exact path="/credit" component={Credit} />
          <Route exact path="/payment/return" component={PaymentReturn} />
          <Route path="*" component={NotFound} />
        </Switch>
      </AnimatePresence>
    </Suspense>
  );
}
