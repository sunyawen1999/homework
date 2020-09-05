import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        component: () => import('../views/Login.vue'),
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: () => import('../views/404.vue'),
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: () => import('../views/Home.vue'),
        name: '',
        hidden: true,
        children: [
            { path: '/userPage', component: () => import('../views/user/userPage'), name: '个人主页' },
        ]
    },
    {
        path: '/',
        component: () => import('../views/Home.vue'),
        name: '',
        hidden: true,
        children: [
            { path: '/resetPassword', component: () => import('../views/user/resetPassword'), name: '修改密码' },
        ]
    },
    {
        path: '/',
        component: () => import('../views/Home.vue'),
        name: '捐赠者管理',
        iconCls: 'el-icon-receiving',
        children: [
            { path: '/donorInfoP', component: () => import('../views/donorManage/donorInfoP'), name: '捐赠人信息'},
            { path: '/donorInfoP/donorDetailP', component: () => import('../views/donorManage/donorDetailP'), name: '捐赠人详情', hidden: true },
            { path: '/donorInfoC', component: () => import('../views/donorManage/donorInfoC'), name: '捐赠单位信息' },
            { path: '/donorInfoC/donorDetailC', component: () => import('../views/donorManage/donorDetailC'), name: '捐赠单位详情', hidden: true },
        ]
    },
    {
        path: '/',
        component: () => import('../views/Home.vue'),
        name: '受捐赠者管理',
        iconCls: 'el-icon-s-shop',
        children: [
            { path: '/doneeInfoP', component: () => import('../views/doneeManage/doneeInfoP'), name: '受捐赠人信息' },
            { path: '/doneeInfoP/doneeDetailP', component: () => import('../views/doneeManage/doneeDetailP'), name: '受捐赠人详情', hidden: true },
            { path: '/doneeInfoC', component: () => import('../views/doneeManage/doneeInfoC'), name: '受捐赠单位信息' },
            { path: '/doneeInfoC/doneeDetailC', component: () => import('../views/doneeManage/doneeDetailC'), name: '受捐赠单位详情', hidden: true }
        ]
    },
    {
        path: '/',
        component: () => import('../views/Home.vue'),
        name: '单位捐赠情况查询',
        iconCls: 'el-icon-s-order',
        children: [
            { path: '/companyAsDonor', component: () => import('../views/companyDonation/companyAsDonor'), name: '捐赠情况' },
            { path: '/companyAsDonor/companyAsDonorDetail', component: () => import('../views/companyDonation/companyAsDonorDetail'), name: '捐赠详情', hidden: true },
            { path: '/companyAsDonee', component: () => import('../views/companyDonation/companyAsDonee'), name: '受捐赠情况' },
            { path: '/companyAsDonee/companyAsDoneeDetail', component: () => import('../views/companyDonation/companyAsDoneeDetail'), name: '受捐赠详情', hidden: true },
            { path: '/ItemDonation', component: () => import('../views/companyDonation/ItemDonation'), name: '捐赠物品情况' },
            { path: '/ItemDonation/ItemDonationDetail', component: () => import('../views/companyDonation/ItemDonationDetail'), name: '捐赠物品详情', hidden: true },
        ]
    },
    {
        path: '/',
        component: () => import('../views/Home.vue'),
        name: '统计分析',
        iconCls: 'el-icon-pie-chart',
        children: [
            { path: '/incomeStatistics', component: () => import('../views/statisticalAnalysis/itemStatistics'), name: '捐赠物品统计' },
        ]
    },
    {
        path: '/',
        component: () => import('../views/Home.vue'),
        name: '版本管理',
        iconCls: 'el-icon-guide',
        children: [
            { path: '/edition', component: () => import('../views/edition/edition'), name: '版本信息' },
        ]
    },
    {
        path: '/',
        component: () => import('../views/Home.vue'),
        name: '用户管理',
        iconCls: 'el-icon-user',
        children: [
            { path: '/roleInfo', component: () => import('../views/roleManage/roleInfo'), name: '用户信息' },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
]

const router = new VueRouter({
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.path === "/login") {
        sessionStorage.removeItem("user");
        }
         const user = JSON.parse(sessionStorage.getItem("user"));
         if (!user && to.path !== "/login") {
             next({ path: "/login" });
    } else {
        next();
    }
});
/*
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
*/

export default router
