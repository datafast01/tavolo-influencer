// import { canNavigate } from '@layouts/plugins/casl'
import { createRouter, createWebHistory } from "vue-router";

// import routes from '~pages'

const routes = [
  // ℹ️ We are redirecting to different pages based on role.
  // NOTE: Role is just for UI purposes. ACL is based on abilities.
 
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/login.vue"),
    //  redirect: () => ({  name: 'login' }),
    meta: { requiresAuth: false },
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/forgot-password.vue"),
    //  redirect: () => ({  name: 'login' }),
    meta: { requiresAuth: false },
  },
  
     {
    path: "/reset-password",
    name: "pages-authentication-login-v2",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/pages/authentication/reset-password-v2.vue"),
    //  redirect: () => ({  name: 'login' }),
    meta: { requiresAuth: true },
  },
  {
    path: "/",
    name: "dashboard",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/dashboard/index.vue"),
    //  redirect: () => ({  name: 'login' }),
    meta: { requiresAuth: false },
  },


  {
    path: "/profile",
    name: "profile",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/profile/index.vue"),
    //  redirect: () => ({  name: 'login' }),
    meta: { requiresAuth: false },
  },

  { path: '/:catchAll(.*)', component: () =>
      import(/* webpackChunkName: "about" */ "../pages/pages/misc/not-found.vue"),meta: { requiresAuth: false } }
  //  {
  //   path: '/auto-email',
  //   redirect: () => ({  name: 'email' }),
  // },
  //  {
  //   path: '/auto-messages',
  //   redirect: () => ({  name: 'messages' }),
  // },
  // {
  //   path: '/pages/user-profile',
  //   redirect: () => ({ name: 'pages-user-profile-tab', params: { tab: 'profile' } }),
  // },
  // {
  //   path: '/pages/account-settings',
  //   redirect: () => ({ name: 'pages-account-settings-tab', params: { tab: 'account' } }),
  // },

  // ...setupLayouts(routes),
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


router.beforeEach((to, from, next) => {
  let auth = localStorage.getItem("token");

  

  // Not logged into a guarded route?
  if (to.meta.requiresAuth === true && auth == null) {
    console.log("requires auth, redirect to login");

    next({ name: "login" });
  }

  // Logged in for an auth route
  else if (
    (to.name == "login" || to.name == "register") &&
    auth != null
  ) {
    console.log("login or register, has a user so send home");
    next({ name: "dashboard" });
  }

  if (to.query.session_id) {
    // Construct the redirect URL without the 'session_id' parameter
    const redirectUrl = '/pricing'; // Update with your desired dashboard route

    // Redirect to the new URL
    next(redirectUrl);

    // Alternatively, if you want to redirect using a full URL
    // window.location.href = 'https://www.web.tavolo.ai/dashboard';
  }
  if(to.query.merchant_id && to.query.employee_id){
    console.log(to.query.merchant_id, 'mercahn', to.query.employee_id)
    localStorage.setItem('merchant_id', to.query.merchant_id)
    localStorage.setItem('employee_id', to.query.employee_id)
    localStorage.setItem('client_id', to.query.client_id)
    localStorage.setItem('clover_code', to.query.code)
next('/profile');
  }

  // Carry On...
  else next();
});




// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
// router.beforeEach((to, from, next) => {
//   const isLoggedIn = !!(localStorage.getItem('token'))

//   console.log(isLoggedIn, to)
// if(!isLoggedIn){
//   console.log('here')
//   return { name: 'login' }
// }

    // if isLoggedIn is False then user is logged in
  // if (to.name !== "login"  && isLoggedIn)
  // {
  //   next({ name: 'login' })
  // }
  // else if(to.name == "register"){
  //   next({name: 'register'})
  // }
  // else next()
 

  //     // ℹ️ Commented code is legacy code

  //     if (to) {
  //       // Redirect to login if not logged in
  //       // ℹ️ Only add `to` query param if `to` route is not index route
  //       if (!isLoggedIn)

  //         return next({ name: 'login', query: { to: to.name !== 'index' ? to.fullPath : undefined } })

  //       // If logged in => not authorized
  //       return next({ name: 'not-authorized' })
  //     }

  //     // Redirect if logged in
  //     if (to.meta.redirectIfLoggedIn && isLoggedIn)
  //       next('/')

  //     return next()

  // if (canNavigate(to)) {
  //   if (to.meta.redirectIfLoggedIn && isLoggedIn)
  //     return '/'
  // }
  // else {
  //   if (isLoggedIn)
  //     return { name: 'not-authorized' }
  //   else
  //     return { name: 'login', query: { to: to.name !== 'index' ? to.fullPath : undefined } }
  // }

export default router;
