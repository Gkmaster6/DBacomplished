<%@ page import="java.security.MessageDigest" %>
<%@ page import="java.security.NoSuchAlgorithmException" %>
<%@ page import="jakarta.servlet.*" %>
<%@ page import="jakarta.servlet.http.*" %>
<%@ page import="com.yootk.dbc.DatabaseConnenction" %>
<%@ page import="java.sql.*" %>
<html>
<head>
  <link rel="icon" sizes="360x360" href="/databasedesign/title图标/favicon.ico">
  <title>登录...</title>
</head>
<body>
<%
  String name = null; // 保存用户姓名
  String username = request.getParameter("username");
  String password = request.getParameter("password");
  String role = null; // 用户角色
  String encryptedPassword = null;

  // 对用户输入的密码进行SHA-256加密
  try {
    MessageDigest md = MessageDigest.getInstance("SHA-256");
    md.update(password.getBytes());
    byte[] byteData = md.digest();
    StringBuilder sb = new StringBuilder();
    for (byte b : byteData) {
      sb.append(String.format("%02x", b));
    }
    encryptedPassword = sb.toString(); // 获取加密后的密码
  } catch (NoSuchAlgorithmException e) {
    e.printStackTrace();
  }

  try {
    String sql = "SELECT user_name, role FROM users WHERE account = ? AND password = ?";
    PreparedStatement preparedStatement = DatabaseConnenction.getConnection().prepareStatement(sql);
    preparedStatement.setString(1, username);
    preparedStatement.setString(2, encryptedPassword); // 使用加密后的密码
    ResultSet resultSet = preparedStatement.executeQuery();

    // 检查用户登录
    if (resultSet.next()) {
      name = resultSet.getString("user_name"); // 登录成功
      role = resultSet.getString("role"); // 获取角色信息
    }

    resultSet.close();
    preparedStatement.close();
    DatabaseConnenction.close();
  } catch (Exception e) {
    e.printStackTrace(); // 异常处理
  }
%>

<%
  if (name == null) {
    // 登录失败，设置错误消息并返回到登录页面
    request.setAttribute("errorMessage", "用户名或密码错误！");
    request.getRequestDispatcher("/databasedesign/Login.html").forward(request, response);
  } else if (role.equals("0")) {
    // 角色为普通用户，跳转到购物车页面
    response.addHeader("refresh", "0; URL=/databasedesign/shouyeforCommon.html");
  } else if (role.equals("1")) {
    // 角色为管理员，跳转到管理员主页
    response.addHeader("refresh", "0; URL=/databasedesign/shouye.html");
  }
%>
</body>
</html>