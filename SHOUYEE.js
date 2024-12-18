/* 侧边按钮显示以及查找并打印操作 */
var imagecontainer = document.getElementById("image-container");
var result = document.getElementById("result");

function sendcan(param) {
    imagecontainer.style.display = "none";
    result.style.display = "block";

    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/data?param=' + encodeURIComponent(param), true); // 请求后端数据时添加参数
    xhr.onload = function() {
        if (xhr.status === 200 && xhr.readyState == 4) {
            result.innerHTML = xhr.responseText; // 将响应的 HTML 显示在页面中
        } else{
            console.log('请求失败', xhr.status);
        }
    };
    xhr.send(); // GET请求不需要发送请求体
}
/* 侧边按钮显示以及查找并打印操作 */

/* 模态框显示操作 */
var modalone = document.getElementById("modalone");
var modaltwo=document.getElementById("modaltwo");
var modalthree=document.getElementById("modalthree");
var modalfour=document.getElementById("modalfour");
var modalfive=document.getElementById("modalfive");
var modalsix=document.getElementById("modalsix");
var span = document.getElementById("close");
var span1=document.getElementById("close1");
var span2=document.getElementById("close2");
var span3=document.getElementById("close3");
var span4=document.getElementById("close4");
var span5=document.getElementById("close5");
var showwin=document.getElementById("showwin");
var save=document.getElementById("save");
// 当前待编辑的行
var currentRow;
span.onclick = function () {
    modalone.style.display = "none";
};
span1.onclick=function (){
    modaltwo.style.display="none"
}
span2.onclick=function (){
    modalthree.style.display="none"
}
span3.onclick=function (){
    modalfour.style.display="none"
}
span4.onclick=function (){
    modalfive.style.display="none"
}
span5.onclick=function (){
    modalsix.style.display="none"
}
window.onclick = function (event) {
    if (event.target == modalone) {
        modalone.style.display = "none";
    }
    else
    if(event.target==modaltwo){
        modaltwo.style.display="none"
    }
    else
    if(event.target==modalthree){
        modalthree.style.display="none"
    }
    else
    if(event.target==modalfour){
        modalfour.style.display="none"
    }
    else
    if(event.target==modalfive){
        modalfive.style.display="none"
    }
    else
    if(event.target==modalsix){
        modalsix.style.display="none"
    }
    else
    if(event.target==deletetr){
        deletetr.style.display="none";
    }
    if (event.target == addmodalone) {
        addmodalone.style.display = "none";
    }
    else
    if(event.target==addmodaltwo){
        addmodaltwo.style.display="none"
    }
    else
    if(event.target==addmodalthree){
        addmodalthree.style.display="none"
    }
    else
    if(event.target==addmodalfive){
        addmodalfive.style.display="none"
    }
    else
    if(event.target==addmodalsix){
        addmodalsix.style.display="none"
    }
};

function show(btn,number){
    const row=btn.closest('tr'); // 获取当前行
    currentRow=row;
    const cells = row.getElementsByTagName("td");
    if(number===1) {
        modalone.style.display = "block";
        document.getElementById('inputNumber').value = cells[0].innerText;
        document.getElementById('inputName').value = cells[1].innerText;
        document.getElementById('inputPassword').value = cells[2].innerText;
        document.getElementById('inputPhone').value = cells[3].innerText;
        document.getElementById('inputRole').value = cells[4].innerText;
        document.getElementById('inputAccount').value = cells[5].innerText;
    }
    else
    if(number===2){
        modaltwo.style.display = "block";
        document.getElementById('inputNumber1').value = cells[0].innerText;
        document.getElementById('inputName1').value = cells[1].innerText;
        document.getElementById('inputPhone1').value = cells[2].innerText;
    }
    else
    if(number===3){
        modalthree.style.display = "block";
        document.getElementById('inputNumber2').value = cells[0].innerText;
        document.getElementById('inputNm2').value = cells[1].innerText;
        document.getElementById('inputCount2').value = cells[2].innerText;
        document.getElementById('inputSpend2').value = cells[3].innerText;
        document.getElementById('inputName2').value = cells[4].innerText;
        document.getElementById('inputPhone2').value = cells[5].innerText;
        document.getElementById('inputAddress2').value = cells[6].innerText;
        document.getElementById('inputWay2').value = cells[7].innerText;
        document.getElementById('inputTime2').value = cells[8].innerText;
    }
    else
    if(number===4){
        modalfour.style.display = "block";
        document.getElementById("inputNumber3").value=cells[0].innerText;
        document.getElementById('inputName3').value = cells[1].innerText;
    }
    else
    if(number===5){
        modalfive.style.display = "block";
        document.getElementById('inputNumber4').value = cells[0].innerText;
        document.getElementById('inputName4').value = cells[1].innerText;
        document.getElementById('inputNm4').value = cells[2].innerText;
    }
    else
    if(number===6){
        modalsix.style.display = "block";
        document.getElementById('inputNumber5').value = cells[0].innerText;
        document.getElementById('inputNm5').value = cells[1].innerText;
        document.getElementById('inputPrice5').value = cells[2].innerText;
        document.getElementById('inputStorage5').value = cells[3].innerText;
    }
}
/* 模态框显示操作 */

/* 删除操作 */
var tablename = null;
var deletetr = document.getElementById("deletemodal");
function Delete(btn, number) {
    const row = btn.closest('tr'); // 获取当前行

    // 根据number设置tablename
    switch (number) {
        case 1:
            tablename = 'users';
            break;
        case 2:
            tablename = 'dispatcher';
            break;
        case 3:
            tablename = 'orders';
            break;
        case 4:
            tablename = 'orderway';
            break;
        case 5:
            tablename = 'maker';
            break;
        case 6:
            tablename = 'product';
            break;
        default:
            console.error("无效的操作 number");
            return;
    }

    //获取当前行的ID
    const idToDelete = row.cells[0].textContent;

    //显示删除确认模态框
    deletetr.style.display = "block";

    //删除操作
    document.getElementById("confirmDelete").onclick = function() {

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/UpandDl', true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onload = function() {
            if (xhr.status === 200 && xhr.readyState == 4) {
                const response = JSON.parse(xhr.responseText);
                console.log("成功", response);
                deletetr.style.display = "none";
                showMessage("删除成功!");
                row.remove();
            } else {
                console.log('请求失败', xhr.statusText);
            }
        };
        xhr.send(`num=7&tablename=${encodeURIComponent(tablename)}&id=${encodeURIComponent(idToDelete)}`);
    };

    //取消删除
    document.getElementById("cancelDelete").onclick = function() {
        deletetr.style.display = "none";
    };

}
/* 删除操作 */


/* 更新操作 */
function savedata(num) {
    if(num===1){
        const user_id = document.getElementById('inputNumber').value
        const user_name = document.getElementById('inputName').value
        const PRpassword = document.getElementById('inputPassword').value
        const telephone = document.getElementById('inputPhone').value
        const role = document.getElementById('inputRole').value
        const account = document.getElementById('inputAccount').value
        // 更新表格中对应的行
        if (currentRow) {
            currentRow.cells[0].innerText = user_id;
            currentRow.cells[1].innerText = user_name;
            currentRow.cells[2].innerText = PRpassword;
            currentRow.cells[3].innerText = telephone;
            currentRow.cells[4].innerText = role;
            currentRow.cells[5].innerText = account;
            document.getElementById('inputNumber').value = "";
            document.getElementById('inputName').value = "";
            document.getElementById('inputPassword').value = "";
            document.getElementById('inputPhone').value = "";
            document.getElementById('inputRole').value = "";
            document.getElementById('inputAccount').value = "";
        }
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/UpandDl', true); // 请求后端数据时添加参数
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function() {
            if (xhr.status === 200 && xhr.readyState == 4) {
                const response=JSON.parse(xhr.responseText)
                console.log("成功",response);
                modalone.style.display="none";
                showMessage("更新完成!");
            } else{
                console.log('请求失败', xhr.statusText);
            }
        };
        xhr.send(`num=1&user_id=${encodeURIComponent(user_id)}&user_name=${encodeURIComponent(user_name)}&PRpassword=${encodeURIComponent(PRpassword)}&telephone=${encodeURIComponent(telephone)}&role=${encodeURIComponent(role)}&account=${encodeURIComponent(account)}`);
    }
    else
    if(num===2){
        const dispatcher_id = document.getElementById('inputNumber1').value
        const dispatcher_name = document.getElementById('inputName1').value
        const dispatcher_phone = document.getElementById('inputPhone1').value
        // 更新表格中对应的行
        if (currentRow) {
            currentRow.cells[0].innerText = dispatcher_id;
            currentRow.cells[1].innerText = dispatcher_name;
            currentRow.cells[2].innerText = dispatcher_phone;
            modaltwo.style.display = "none"; // 关闭模态框
            document.getElementById('inputNumber1').value = "";
            document.getElementById('inputName1').value = "";
            document.getElementById('inputPhone1').value = "";
        }
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/UpandDl', true); // 请求后端数据时添加参数
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function() {
            if (xhr.status === 200 && xhr.readyState == 4) {
                const response=JSON.parse(xhr.responseText)
                console.log("成功",response);
                modaltwo.style.display="none";
                showMessage("更新完成!");
            } else{
                console.log('请求失败', xhr.statusText);
            }
        };
        xhr.send(`num=2&dispatcher_id=${encodeURIComponent(dispatcher_id)}&dispatcher_name=${encodeURIComponent(dispatcher_name)}&dispatcher_phone=${encodeURIComponent(dispatcher_phone)}`);
    }
    else
    if(num===3){
        const orders_id=document.getElementById('inputNumber2').value
        const product_name=document.getElementById('inputNm2').value
        const number=document.getElementById('inputCount2').value
        const order_money=document.getElementById('inputSpend2').value
        const user_name=document.getElementById('inputName2').value
        const phone=document.getElementById('inputPhone2').value
        const address=document.getElementById('inputAddress2').value
        const order_way=document.getElementById('inputWay2').value
        const create_time=document.getElementById('inputTime2').value
        // 更新表格中对应的行
        if (currentRow) {
            currentRow.cells[0].innerText = orders_id;
            currentRow.cells[1].innerText = product_name;
            currentRow.cells[2].innerText = number;
            currentRow.cells[3].innerText = order_money;
            currentRow.cells[4].innerText = user_name;
            currentRow.cells[5].innerText = phone;
            currentRow.cells[6].innerText = address;
            currentRow.cells[7].innerText = order_way;
            currentRow.cells[8].innerText = create_time;
            modalthree.style.display = "none"; // 关闭模态框
            document.getElementById('inputNumber2').value=""
            document.getElementById('inputNm2').value=""
            document.getElementById('inputCount2').value=""
            document.getElementById('inputSpend2').value=""
            document.getElementById('inputName2').value=""
            document.getElementById('inputPhone2').value=""
            document.getElementById('inputAddress2').value=""
            document.getElementById('inputWay2').value=""
            document.getElementById('inputTime2').value=""
        }
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/UpandDl', true); // 请求后端数据时添加参数
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function() {
            if (xhr.status === 200 && xhr.readyState == 4) {
                const response=JSON.parse(xhr.responseText)
                console.log("成功",response);
                modalthree.style.display="none";
                showMessage("更新完成!");
            } else{
                console.log('请求失败', xhr.statusText);
                alert("库存不足或产品不存在，请重新输入或更新库存");
            }
        };
        xhr.send(`num=3&orders_id=${encodeURIComponent(orders_id)}&product_name=${encodeURIComponent(product_name)}&number=${encodeURIComponent(number)}&order_money=${encodeURIComponent(order_money)}&user_name=${encodeURIComponent(user_name)}&phone=${encodeURIComponent(phone)}&address=${encodeURIComponent(address)}&order_way=${encodeURIComponent(order_way)}&create_time=${encodeURIComponent(create_time)}`);
    }
    else
    if(num===4){
        const orderway_name = document.getElementById('inputNumber3').value
        const count = document.getElementById('inputName3').value
        // 更新表格中对应的行
        if (currentRow) {
            currentRow.cells[1].innerText = count;
            currentRow.cells[0].innerText = orderway_name;
            modalfour.style.display = "none"; // 关闭模态框
            document.getElementById('inputNumber3').value = "";
            document.getElementById('inputName3').value = "";
        }
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/UpandDl', true); // 请求后端数据时添加参数
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function() {
            if (xhr.status === 200 && xhr.readyState == 4) {
                const response=JSON.parse(xhr.responseText)
                console.log("成功",response);
                modalfour.style.display="none";
                showMessage("更新完成!");
            } else{
                console.log('请求失败', xhr.statusText);
            }
        };
        xhr.send(`num=4&orderway_name=${encodeURIComponent(orderway_name)}&count=${encodeURIComponent(count)}`);

    }
    else
    if(num===5){
        const maker_id = document.getElementById('inputNumber4').value
        const maker_name = document.getElementById('inputName4').value
        const product_name = document.getElementById('inputNm4').value
        // 更新表格中对应的行
        if (currentRow) {
            currentRow.cells[0].innerText = maker_id;
            currentRow.cells[1].innerText = maker_name;
            currentRow.cells[2].innerText = product_name;
            modalfive.style.display = "none"; // 关闭模态框
            document.getElementById('inputNumber4').value = "";
            document.getElementById('inputName4').value = "";
            document.getElementById('inputNm4').value = "";
        }
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/UpandDl', true); // 请求后端数据时添加参数
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function() {
            if (xhr.status === 200 && xhr.readyState == 4) {
                const response=JSON.parse(xhr.responseText)
                console.log("成功",response);
                modalfive.style.display="none";
                showMessage("更新完成!");
            } else{
                console.log('请求失败', xhr.statusText);
            }
        };
        xhr.send(`num=5&maker_id=${encodeURIComponent(maker_id)}&maker_name=${encodeURIComponent(maker_name)}&product_name=${encodeURIComponent(product_name)}`);
    }
    else
    if(num===6){
        const product_id = document.getElementById('inputNumber5').value
        const product_name = document.getElementById('inputNm5').value
        const product_price = document.getElementById('inputPrice5').value
        const stock=document.getElementById("inputStorage5").value
        // 更新表格中对应的行
        if (currentRow) {
            currentRow.cells[0].innerText = product_id;
            currentRow.cells[1].innerText = product_name;
            currentRow.cells[2].innerText = product_price;
            currentRow.cells[3].innerText=stock;
            modalsix.style.display = "none"; // 关闭模态框
            document.getElementById('inputNumber5').value = "";
            document.getElementById('inputNm5').value = "";
            document.getElementById('inputPrice5').value = "";
            document.getElementById('inputStorage5').value = "";
        }
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/UpandDl', true); // 请求后端数据时添加参数
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function() {
            if (xhr.status === 200 && xhr.readyState == 4) {
                const response=JSON.parse(xhr.responseText)
                console.log("成功",response);
                modalsix.style.display="none";
                showMessage("更新完成!");
            } else{
                console.log('请求失败', xhr.statusText);
            }
        };
        xhr.send(`num=6&product_id=${encodeURIComponent(product_id)}&product_name=${encodeURIComponent(product_name)}&product_price=${encodeURIComponent(product_price)}&stock=${encodeURIComponent(stock)}`);

    }
}
/* 更新操作 */



<!-- 增加操作 -->

var addmodalone = document.getElementById("addmodalone");
var addmodaltwo=document.getElementById("addmodaltwo");
var addmodalthree=document.getElementById("addmodalthree");
var addmodalfive=document.getElementById("addmodalfive");
var addmodalsix=document.getElementById("addmodalsix");
var addspan = document.getElementById("addclose");
var addspan1=document.getElementById("addclose1");
var addspan2=document.getElementById("addclose2");
var addspan4=document.getElementById("addclose4");
var addspan5=document.getElementById("addclose5");


addspan.onclick = function () {
    addmodalone.style.display = "none";
};
addspan1.onclick=function (){
    addmodaltwo.style.display="none"
}
addspan2.onclick=function (){
    addmodalthree.style.display="none"
}
addspan4.onclick=function (){
    addmodalfive.style.display="none"
}
addspan5.onclick=function (){
    addmodalsix.style.display="none"
}


function addshow(number){
    if(number==1){
        addmodalone.style.display="block";
    }
    else
    if(number==2){
        addmodaltwo.style.display="block";
    }
    else
    if(number==3){
        addmodalthree.style.display="block";
    }
    else
    if(number==5){
        addmodalfive.style.display="block";
    }
    else
    if(number==6){
        addmodalsix.style.display="block";
    }
}

function addsave(num) {

    var xhr = new XMLHttpRequest();
    var url = "/AddData";

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var data = "";

    if (num === 1) {
        // 用户数据
        var user_name = document.getElementById('addinputName').value;
        var telephone = document.getElementById('addinputPhone').value;
        var role = document.getElementById('addinputRole').value;
        var account = document.getElementById('addinputAccount').value;
        var PRpassword = document.getElementById('addinputPassword').value;

        data = "num=1&user_name=" + encodeURIComponent(user_name) +
            "&telephone=" + encodeURIComponent(telephone) +
            "&role=" + encodeURIComponent(role) +
            "&account=" + encodeURIComponent(account) +
            "&PRpassword=" + encodeURIComponent(PRpassword);

    } else if (num === 2) {
        var dispatcher_name = document.getElementById('addinputName1').value;
        var dispatcher_phone = document.getElementById('addinputPhone1').value;

        data = "num=2&dispatcher_name=" + encodeURIComponent(dispatcher_name) +
            "&dispatcher_phone=" + encodeURIComponent(dispatcher_phone);

    } else if (num === 3) {
        var product_name = document.getElementById('addinputNm2').value;
        var number = document.getElementById('addinputCount2').value;
        var user_name = document.getElementById('addinputName2').value;
        var phone = document.getElementById('addinputPhone2').value;
        var address = document.getElementById('addinputAddress2').value;
        var order_way = document.getElementById('addinputWay2').value;
        var create_time = new Date().toISOString(); // 使用当前时间

        data = "num=3&product_name=" + encodeURIComponent(product_name) +
            "&number=" + encodeURIComponent(number) +
            "&user_name=" + encodeURIComponent(user_name) +
            "&phone=" + encodeURIComponent(phone) +
            "&address=" + encodeURIComponent(address) +
            "&order_way=" + encodeURIComponent(order_way);
    } else if (num === 5) {
        var maker_name = document.getElementById('addinputName4').value;
        var product_name = document.getElementById('addinputNm4').value;

        data = "num=5&maker_name=" + encodeURIComponent(maker_name) +
            "&product_name=" + encodeURIComponent(product_name);

    } else if (num === 6) {
        var product_name = document.getElementById('addinputNm5').value;
        var product_price = document.getElementById('addinputPrice5').value;
        var stock = document.getElementById('addinputStorage5').value;

        data = "num=6&product_name=" + encodeURIComponent(product_name) +
            "&product_price=" + encodeURIComponent(product_price) +
            "&stock=" + encodeURIComponent(stock);
    }

    // 发送请求
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                //处理成功响应
                var response = JSON.parse(xhr.responseText);
                console.log("成功",response);
                switch (num) {
                    case 1:
                        document.getElementById('addmodalone').style.display = 'none'; // 关闭模态框1
                        break;
                    case 2:
                        document.getElementById('addmodaltwo').style.display = 'none'; // 关闭模态框2
                        break;
                    case 3:
                        document.getElementById('addmodalthree').style.display = 'none'; // 关闭模态框3
                        break;
                    case 5:
                        document.getElementById('addmodalfive').style.display = 'none'; // 关闭模态框5
                        break;
                    case 6:
                        document.getElementById('addmodalsix').style.display = 'none'; // 关闭模态框6
                        break;
                }
                document.getElementById("not-enough").style.display="none";
                showMessage("处理成功");
            } else {
                // 处理错误响应
                if(num==3){
                    document.getElementById("not-enough").style.display="block";
                    document.getElementById("not-enough").style.width="310px";
                }
                else{
                    console.log('请求失败', xhr.statusText);
                }

            }
        }
    };

    xhr.send(data);
}
// 显示消息的函数
function showMessage(message) {
    var messageBox = document.getElementById('messageBox');
    messageBox.innerText = message; // 设置消息内容
    messageBox.style.display = 'block'; // 显示消息框
    messageBox.style.opacity = 1; // 设置初始透明度为1

    // 设置定时器，2秒后缓慢消失
    setTimeout(function() {
        messageBox.style.opacity = 0;
        setTimeout(function() {
            messageBox.style.display = 'none';
        }, 2000);
    }, 1000);//显示2秒后开始消失
}