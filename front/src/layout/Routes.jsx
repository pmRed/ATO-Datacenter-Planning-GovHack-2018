import Home from '../routes/Home'
import Visualisation from '../routes/Visualisation'
import Data from '../routes/Sources'

const hashes = {
    paths: [
        {
            path: '/home',
            name: 'Implementation',
            icon: 'home',
            component: Home
        },
        {
            path: '/analytics',
            name: 'Analytics',
            icon: 'search',
            component: Visualisation 
        },
        // {
        //     path: '/app',
        //     name: 'Application',
        //     icon: 'rocket',
        //     component: Data 
        // },
        {
            path: '/sources',
            name: 'Data Sources',
            icon: 'database',
            component: Data
        },
    ],
    redirect: {path: '/', to: '/home', name: 'Home'}
}

export default hashes
