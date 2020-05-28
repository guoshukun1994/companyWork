const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  user_CD: state => state.user_CD,
  user_Name: state => state.user_Name,
  user_Email: state => state.user.user_Email,
  user_Type: state => state.user.user_Type,
  user_Phone: state => state.user_Phone,
  permission_routes: state => state.permission.routes
}
export default getters
