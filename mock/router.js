const router = [
    {
        path: '/table',
        component: "Layout",
        meta: {
            icon: '1',
            title: '表格1'
        },
        children: [ {
            path: 'dashboard',
            name: 'Dashboard',
            component: '/dashboard/index',
            meta: {
                title: 'Dashboard',
                icon: 'dashboard'
            }
        }, {
            path: 'dashboard',
            name: 'Dashboard',
            component: '/dashboard/index',
            meta: {
                title: 'Dashboard',
                icon: 'dashboard'
            }
        }]

    },
]

module.exports = {
    router
}
