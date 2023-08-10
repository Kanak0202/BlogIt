//API_NOTIFICATION_MESSAGES

export const API_NOTIFICATION_MESSAGES = {
    loading:{
        title: 'Loading...',
        message: 'Data is being loaded, Please wait'
    },
    success:{
        title:'Success',
        message: 'Data loaded successfully'
    },
    responseFailure:{
        title:'Error',
        message:'An error occured while fetching response from the server, Please try again'
    },
    requestFailure:{
        title:'Error',
        message:'An error occured while parsing request data'
    }, 
    networkError:{
        title:'Error',
        message:"Unable to connect with with the server, Please check internet connectivity"
    }
};

//API SERVICE CALL

export const SERVICE_URLS = {
    userSignup: {
        url: '/signup', method:'POST'
    },
    userLogin: {url: '/login', method:'POST'},
    uploadFile: {url: "/file/upload", method:"POST"},
    createPost: { url:'/create', method:'POST'},
    getAllPosts: {url:'/posts', method:'GET', params: true},
    getPostById: {url:"/post/:id", method:'GET', query: true},
    updatePost:{url:"/update/:id", method:'PUT', query: true}
}