<html>
<head>
    <title>Chat room</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="style.css">
    <!-- 1. 载入库 -->
    <!-- IE 需要 polyfill -->
    <script src="node_modules/client/shim.min.js"></script>
    <script src="scripts/zone.js"></script>
    <script src="scripts/Reflect.js"></script>
    <script src="node_modules/dist/system.src.js"></script>
    <!-- 2. 配置 SystemJS -->
    <script src="systemjs.config.js"></script>
    <script>
        System.import('app').catch(function(err){ console.error(err); });
    </script>
    <script src="http://localhost:3000/socket.io/socket.io.js"></script>
    <script type="text/JavaScript" src="scripts/jquery-3.2.1.min.js"></script>
    <link rel="stylesheet" href="main.css" type="text/css" />
</head>
<!-- 3. 显示应用 -->
<body>
<my-app>Loading...</my-app>
</body>
</html>