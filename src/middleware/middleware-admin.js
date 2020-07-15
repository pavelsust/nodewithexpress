
function adminMiddleware(request , response , next){
    // 401 Unauthorized
    // 403 Forbidden

    if (!request.user.isAdmin) return response.status(403).send('Access denied')
    next()
}

module.exports = adminMiddleware