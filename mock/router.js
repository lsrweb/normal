const router = [
    {
        path: 'permission',
        component: 'Layout',
        name: 'permission',
        redirect: '/index',
        meta: {
            title: '权限管理',
            icon: 'edit'
        },
        children: [
            {
                path: '/index',
                name: 'table',
                component: '/table/permission',
                meta: {
                    icon: 'edit',
                    title: '权限表格'
                }
            },
            {
                path: '/list',
                name: 'perlist',
                component: '/table/perlist',
                meta: {
                    icon: 'edit',
                    title: '权限列表'
                },
                children: [
                    {
                        path: '/test',
                        name: 'test',
                        component: '/table/test',
                        meta: {
                            title: '测试三级',
                            icon: '测试三级'
                        }
                    },
                    {
                        path: '/test',
                        name: 'test',
                        component: '/table/test',
                        meta: {
                            title: '测试三级',
                            icon: '测试三级'
                        },
                        children: [
                            {
                                path: '/four',
                                name: 'four',
                                component: '/table/test',
                                meta: {
                                    title: '测试四级',
                                    icon: 'happy'
                                }
                            }, {
                                path: '/four',
                                name: 'foura',
                                component: '/table/test',
                                meta: {
                                    title: '测试四级',
                                    icon: 'happy'
                                }
                            },
                        ]
                    }
                ]
            }
        ]
    }
]

module.exports = {
    router
}
