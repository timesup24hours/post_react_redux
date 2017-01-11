import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import HomePage from './components/home/HomePage'
import ProductsPage from './components/products/ProductsPage'
import ContactPage from './components/contact/ContactPage'
import AboutPage from './components/about/AboutPage'
import PostDetailPage from './components/post/PostDetailPage'
import PostsPage from './components/post/PostsPage(infinite scroll)'
import SignupPage from './components/signup/SignupPage'
import LoginPage from './components/login/LoginPage'
import ForgetPassword from './components/login/ForgetPassword'
import ResetPassword from './components/login/ResetPassword'
import EmailVerify from './components/signup/EmailVerify'
import SendVerificationEmail from './components/signup/SendVerificationEmail'
import ChatPage from './components/chat/ChatPage'
import ProfilePage from './components/profile/ProfilePage'
import ProfileInfo from './components/profile/ProfileInfo'
import ProfileAvatar from './components/profile/ProfileAvatar'
import FacebookCallback from './components/auth/FacebookCallback'
import GoogleCallback from './components/auth/GoogleCallback'
import requireAuth from './utils/requireAuth'
import AuthSuccess from './components/auth/AuthSuccess'
import AuthFailure from './components/auth/AuthFailure'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="/chat" component={ChatPage}/>
    <Route path="/products" component={ProductsPage}/>
    <Route path="/contact" component={ContactPage}/>
    <Route path="/about" component={AboutPage}/>
    <Route path="/posts" component={PostsPage}/>
    <Route path="/posts/:_id" component={PostDetailPage}/>
    <Route path="/signup" component={SignupPage}/>
    <Route path="/login" component={LoginPage}/>
    <Route path="/forget_password" component={ForgetPassword}/>
    <Route path="/reset_password" component={ResetPassword}/>
    <Route path="/verify_email" component={EmailVerify}/>
    <Route path="/send_verify_email" component={SendVerificationEmail}/>
    <Route path="/profile" component={requireAuth(ProfilePage)}>
      <IndexRoute component={requireAuth(ProfileInfo)}/>
      <Route path="/profile/information" component={requireAuth(ProfileInfo)}/>
      <Route path="/profile/avatar" component={requireAuth(ProfileAvatar)}/>
      <Route path='/profile/reset_password' component={requireAuth(ForgetPassword)} />
    </Route>
    <Route path="/auth_facebook_callback" component={FacebookCallback}/>
    <Route path="/auth_google_callback" component={GoogleCallback}/>
    <Route path="/auth/success/:token" component={AuthSuccess}/>
    <Route path="/auth/failure/:error" component={AuthFailure}/>
  </Route>
)
