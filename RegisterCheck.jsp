<%@ page import="java.security.MessageDigest" %>
<%@ page import="java.security.NoSuchAlgorithmException" %>
<%@ page import="jakarta.servlet.*" %>
<%@ page import="jakarta.servlet.http.*" %>
<%@ page import="java.sql.*" %>
<%@ page import="com.yootk.dbc.DatabaseConnenction" %>
<%@ page pageEncoding="UTF-8" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
<head>
  <link rel="icon" sizes="360x360" href="/databasedesign/title图标/favicon.ico">
  <title>正在注册...</title>
  <style>
    .tips-valid{
      display: none;
    text-align: center;
    width: 250px;
    position: absolute;
    top: 165px;
    left: 50%;
    transform:translateX(-50%);
    font-size: 13px;
    color:#FF1361;
    }
  </style>
</head>
<body>

<span class="tips-valid">验证码错误，请重试。</span>

<%
  response.setContentType("text/html; charset=UTF-8");

  int flag = 0;
  String username = request.getParameter("username");
  String password = request.getParameter("password");
  String captchaInput = request.getParameter("captcha");

  // 从session获取生成的验证码
  String captchaGenerated = (String) session.getAttribute("captcha");

  // 验证码验证
  if (captchaGenerated == null || !captchaGenerated.equals(captchaInput)) {
    out.println("<script>alert('验证码错误，请重试。'); window.location.href='/databasedesign/Register.html';</script>");
    return;
  }

  // 密码加密
  String encryptedPassword = null;
  try {
    MessageDigest md = MessageDigest.getInstance("SHA-256");
    md.update(password.getBytes("UTF-8"));  // 使用 UTF-8 进行编码
    byte[] byteData = md.digest();
    StringBuilder sb = new StringBuilder();
    for (byte b : byteData) {
      sb.append(String.format("%02x", b));
    }
    encryptedPassword = sb.toString();
  } catch (NoSuchAlgorithmException e) {
    e.printStackTrace();
    out.println("<script>alert('密码加密失败，请重试。'); window.location.href='/databasedesign/Register.html';</script>");
    return;
  }

  Connection conn = null;
  PreparedStatement preparedStatement1 = null;
  PreparedStatement preparedStatement = null;

  try {
    conn = DatabaseConnenction.getConnection();

    String sql1 = "SELECT account FROM mall.users WHERE account = ?";
    preparedStatement1 = conn.prepareStatement(sql1);
    preparedStatement1.setString(1, username);
    ResultSet resultSet1 = preparedStatement1.executeQuery();

    // 检查用户名是否存在
    if (resultSet1.next()) {
      flag++;
      out.println("<script>alert('用户名已存在，请选择其他用户名。'); window.location.href='/databasedesign/Register.html';</script>");
    } else {
      String sql = "INSERT INTO mall.users(account, password,PRpassword) VALUES(?, ?,?)";
      preparedStatement = conn.prepareStatement(sql);
      preparedStatement.setString(1, username);
      preparedStatement.setString(2, encryptedPassword);
      preparedStatement.setString(3, password);
      preparedStatement.executeUpdate();
      response.addHeader("refresh", "0; URL=/databasedesign/Login.html");
    }
    resultSet1.close();
  } catch (SQLException e) {
    e.printStackTrace();
    out.println("<script>alert('数据库操作出错，请重试。'); window.location.href='/databasedesign/Register.html';</script>");
  } finally {
    // 关闭资源
    if (preparedStatement1 != null) {
      try { preparedStatement1.close(); } catch (SQLException e) { e.printStackTrace(); }
    }
    if (preparedStatement != null) {
      try { preparedStatement.close(); } catch (SQLException e) { e.printStackTrace(); }
    }
    if (conn != null) {
        DatabaseConnenction.close();
    }
  }
%>
</body>
</html>