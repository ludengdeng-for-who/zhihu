module.exports = {
    publicPath:"./",
    devServer:{
        proxy:{
            "/api":{
                target:"http://api.vikingship.xyz",
                secure: false, 
                changeOrigin: true, 
            }
        }
    }
}