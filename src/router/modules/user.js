/*
 * @Author: Amanda
 * @Date: 2019-07-16 15:24:47
 * @Last Modified by:   Amanda
 * @Last Modified time: 2019-07-16 15:24:47
 *@Remark:  用户-个人中心路由配置文件 */

import headerCrumbsMain from '@/pages/layout/headerCrumbsMain.vue';
// import headerLeftCrumbsMain from '@/pages/layout/headerLeftCrumbsMain.vue';
// import headerLeftTreebarMain from '@/pages/layout/headerLeftTreebarMain.vue';
import headerLeftMain from '@/pages/layout/headerLeftMain.vue';
const router = [
    {
        path: '/userMain',
        component: headerCrumbsMain,
        name: 'userMain',
        meta: {title: '个人中心'},
        children: [{
            path: '/userMain',
            component: () => import('@/pages/user/userMain.vue'),
        }]
    },
    {
        path: '/userMgr',
        component: headerLeftMain,
        name: 'userMgr',
        children: [{
            path: '/userMgr',
            meta: {title: '用户管理'},
            component: () => import('@/pages/user/userMgr.vue'),
        },{
            path: '/userAdd',
            meta: {title: '用户新增'},
            component: () => import('@/pages/user/userAdd.vue'),
        },{
            path: '/userUpdate',
            meta: {title: '用户修改'},
            component: () => import('@/pages/user/userUpdate.vue'),
        },{
            path: '/userImport',
            meta: {title: '批量导入'},
            component: () => import('@/pages/user/userImport.vue'),
        },{
            path: '/userSonMgr',
            meta: {title: '列表'},
            component: () => import('@/pages/user/userSonMgr.vue'),
        },{
            path: '/adminInfo',
            meta: {title: '管理员查看'},
            component: () => import('@/pages/user/adminInfo.vue'),
        },{
            path: '/teacherInfo',
            meta: {title: '教师查看'},
            component: () => import('@/pages/user/teacherInfo.vue'),
        },{
            path: '/studentInfo',
            meta: {title: '学生查看'},
            component: () => import('@/pages/user/teacherInfo.vue'),
        }]
    },
    // {
    //     path: '/userAdd',
    //     component: headerLeftCrumbsMain,
    //     name: 'userAdd',
    //     meta: {title: '用户管理-新增'},
    //     children: [{
    //         path: '',
    //         component: () => import('@/pages/user/userAdd.vue'),
    //     }]
    // },
    // {
    //     path: '/userUpdate',
    //     component: headerLeftCrumbsMain,
    //     name: 'userUpdate',
    //     meta: {title: '用户管理-修改'},
    //     children: [{
    //         path: '',
    //         component: () => import('@/pages/user/userUpdate.vue'),
    //     }]
    // },
    // {
    //     path: '/userImport',
    //     component: headerLeftCrumbsMain,
    //     name: 'userImport',
    //     meta: {title: '批量导入'},
    //     children: [{
    //         path: '',
    //         component: () => import('@/pages/user/userImport.vue'),
    //     }]
    // },
    // {
    //     path: '/userSonMgr',
    //     component: headerLeftTreebarMain,
    //     name: 'userSonMgr',
    //     meta: {title: '用户管理-tab切换入口'},
    //     children: [{
    //         path: '',
    //         component: () => import('@/pages/user/userSonMgr.vue'),
    //     }]
    // },
    // {
    //     path: '/adminInfo',
    //     component: headerLeftCrumbsMain,
    //     name: 'adminInfo',
    //     meta: {title: '查看'},
    //     children: [{
    //         path: '',
    //         component: () => import('@/pages/user/adminInfo.vue'),
    //     }]
    // },
    // {
    //     path: '/teacherInfo',
    //     component: headerLeftCrumbsMain,
    //     name: 'teacherInfo',
    //     meta: {title: '查看'},
    //     children: [{
    //         path: '',
    //         component: () => import('@/pages/user/teacherInfo.vue'),
    //     }]
    // },
    // {
    //     path: '/studentInfo',
    //     component: headerLeftCrumbsMain,
    //     name: 'studentInfo',
    //     meta: {title: '查看'},
    //     children: [{
    //         path: '',
    //         component: () => import('@/pages/user/studentInfo.vue'),
    //     }]
    // }
];

export default router;
