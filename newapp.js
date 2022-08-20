  $("[id=greatest]").click(function (e){
    var fid = $(e.target).parent().attr("postid")
    checkAsker(fid)
    var cap = document.getElementById("verify_img");
    cap.src = "/code"+'?'+Math.random();
  })

  //support
  $("[id=support]").click(
          function (e){
            var now = $(e.target);
            now.append("<div class='loader' id='load'></div>");
            now.attr("disabled", "disabled");

            var json = {"id":now.parent().attr("postid")}
            $.ajax({
              type:"post",
              datatype: 'json',
              url:'/api/support',
              data:json,
              success:function (rs){
                $("#load").remove()
                now.removeAttr("disabled")
                switch (rs.statue){
                  case 1006:
                    Swal.fire("点赞出错", rs.data, "error");
                    break;
                  case 1007:
                    Swal.fire("点赞出错", rs.data, "error");
                    break;
                  case 1008:
                    Swal.fire({
                      title: "点赞成功!",
                      text: rs.data,
                      icon: "success",
                      confirmButtonText: "返回",
                    });
                    break;
                  case 1022:
                    Swal.fire({
                      title: "点赞失败!",
                      text: rs.data,
                      icon: "error",
                      confirmButtonText: "返回",
                    });
                    break;
                }
              },
              error:function (){
                $("#load").remove()
                now.removeAttr("disabled")
                Swal.fire({
                  title: "提交失败!",
                  text: "也许是网络的问题",
                  icon: "error",
                  confirmButtonText: "确定",
                });
              }
            })
          })

  //提交
  $("#submitid").click(
          function (){
            $("#add").append("<div class='loader' id='load'></div>");
            $("#submitid").attr("disabled", "disabled");
            var s=$("#add").serialize();
            $.ajax({
              type:"post",
              datatype: 'json',
              url:'/api/add',
              data:s,
              success:function (rs){
                var cap = document.getElementById("cap");
                cap.src = "/code"+'?'+Math.random();
                $("#load").remove()
                $("#submitid").removeAttr("disabled")
                switch (rs.statue){
                  case 1004:
                    $("#answer").val("");
                    $("#ask").val("");
                    Swal.fire({
                      title: "提交成功(审核通过)!",
                      text: rs.data,
                      icon: "success",
                      confirmButtonText: "感谢您的贡献",
                    });
                    break;
                  case 1005:
                    $("#answer").val("");
                    $("#ask").val("");
                    Swal.fire({
                      title: "提交成功(代人工审核)!",
                      text: rs.data,
                      icon: "success",
                      confirmButtonText: "感谢您的贡献",
                    });
                    break;
                  default:
                    Swal.fire("提交出错", rs.data, "error");
                    break;
                }
              },
              error:function (){
                $("#submitid").removeAttr("disabled")
                $("#load").remove()
                Swal.fire({
                  title: "提交失败!",
                  text: "也许是网络的问题",
                  icon: "error",
                  confirmButtonText: "确定",
                });
              }
            })
          });

  //点赞


  $("#likes").click(
          function (){
            $("#likes").append("<div class='loader' id='load'></div>");
            $("#likes").attr("disabled", "disabled");
            var json = {"QV":$("#QVID").val()}
            $.ajax({
              type:"post",
              datatype: 'json',
              url:'/api/like',
              data:json,
              success:function (rs){
                $("#load").remove()
                $("#likes").removeAttr("disabled")
                switch (rs.statue){
                  case 1006:
                    Swal.fire("点赞出错", rs.data, "error");
                    break;
                  case 1007:
                    Swal.fire("点赞出错", rs.data, "error");
                    break;
                  case 1008:
                    Swal.fire({
                      title: "点赞成功!",
                      text: rs.data,
                      icon: "success",
                      confirmButtonText: "返回",
                    });
                    zan = parseInt($("#likes").val())+parseInt(1);
                    $("#likes").text("点赞("+zan+")");
                    break;
                  case 1022:
                    Swal.fire({
                      title: "点赞失败!",
                      text: rs.data,
                      icon: "error",
                      confirmButtonText: "返回",
                    });
                    break;
                }
              },
              error:function (){
                $("#load").remove()
                $("#likes").removeAttr("disabled")
                Swal.fire({
                  title: "提交失败!",
                  text: "也许是网络的问题",
                  icon: "error",
                  confirmButtonText: "确定",
                });
              }
            })
          })


  $("#PostAnswer").click(
          function (){
            $("#add").append("<div class='loader' id='load'></div>");
            $("#submitid").attr("disabled", "disabled");
            // var s=$("#add").serialize();
            var json = {"QV":$("#QVID").val(),"answer":$("#answer").val(),"cap":$("#capin").val()}
            $.ajax({
              type:"post",
              datatype: 'json',
              url:'/api/PostAnswer',
              data:json,
              success:function (rs){
                var cap = document.getElementById("cap");
                cap.src = "/code"+'?'+Math.random();
                $("#load").remove()
                $("#submitid").removeAttr("disabled")
                switch (rs.statue){
                  case 1004:
                    $("#answer").val("");
                    $("#ask").val("");
                    Swal.fire({
                      title: "提交成功(审核通过)!",
                      text: rs.data,
                      icon: "success",
                      confirmButtonText: "感谢您的贡献",
                    });
                    break;
                  case 1005:
                    $("#answer").val("");
                    $("#ask").val("");
                    Swal.fire({
                      title: "提交成功(代人工审核)!",
                      text: rs.data,
                      icon: "success",
                      confirmButtonText: "感谢您的贡献",
                    });
                    break;
                  default:
                    Swal.fire("提交出错", rs.data, "error");
                    break;
                }
              },
              error:function (){
                $("#submitid").removeAttr("disabled")
                $("#load").remove()
                Swal.fire({
                  title: "提交失败!",
                  text: "也许是网络的问题",
                  icon: "error",
                  confirmButtonText: "确定",
                });
              }
            })
          });

  function valid_email(email){
    var myreg = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    if(!myreg.test(email)){
      correctpass = false;
    }else{
      correctpass = true;
    }
    return correctpass;

  }
  async function checkAsker(fid){
    const { value: text } = await Swal.fire({
      title: '询问者采纳',


      html:
              '<input style="margin-bottom: 15px;" type="text" name="swal_email" id="swal_email" class="form-control" placeholder="请输入询问时邮箱，如未留不支持采纳" value="" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">' +
      '<div class="input-group input-group-lg">\n' +
              '            <img id="verify_img" src="/code" onClick="this.src=\'/code?\'+Math.random();">\n' +
              '            <input type="text" name="swal_verify" id="swal_verify" class="form-control" placeholder="验证码" value="">\n' +
              '        </div>',
      cancelButtonText:"取消采纳",
      confirmButtonColor: '#91c411',
      cancelButtonColor: '#db3737',
      confirmButtonText:"采纳~",
      showCancelButton: true,
      preConfirm: ()=>{
        var cap = document.getElementById("swal_verify").value
        var email = document.getElementById("swal_email").value
        console.log(email)
        if (email==""){
          Swal.showValidationMessage(
                  `请输入您的邮箱`
          )
          return;
        }else if(!valid_email(email)){
          Swal.showValidationMessage(
                  `请输入正确的邮箱格式`
          )
        }else if (email.length>120){
          Swal.showValidationMessage(
                  `没有这么长的邮箱吧！`
          )
          return;


        }else if(cap=="" || cap.length !=4){
          Swal.showValidationMessage(
                  `验证码错误！`
          )
          return;
        }

        var json = {"fid": fid,"email":email,"cap":cap};
        $.ajax({
          type:"post",
          datatype:"json",
          data:json,
          url:"/api/vote",
          success:function (rs){
            switch (rs.statue){
              case 1006:
                Swal.fire({
                  title: "反馈成功!",
                  text: rs.data,
                  icon: "success",
                  confirmButtonText: "感谢您的贡献",
                });
                return;
              case 1008:
                Swal.fire({
                  title: "反馈失败!",
                  text: rs.data,
                  icon: "error",
                  confirmButtonText: "确定",
                });
                return;
            }
          }
        })
      }

    })
  }

  async function feedback(){
    const { value: text } = await Swal.fire({
      title: '反馈(报错和改进)',
      input: 'textarea',
      inputLabel: '请问这个知识有哪里不对呢？',
      inputPlaceholder: '请在这里输入具体问题(250个字内)',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      cancelButtonText:"取消反馈",
      confirmButtonColor: '#91c411',
      cancelButtonColor: '#db3737',
      confirmButtonText:"确认反馈",
      showCancelButton: true,
      preConfirm: (text)=>{
        if (text==""){
          Swal.showValidationMessage(
                  `请输入要反馈的信息`
          )
          return;
        }else if (text.length>250){
          Swal.showValidationMessage(
                  `字数超标了，请控制在250字内`
          )
          return;


        }

        var json = {"QVID": $("#QVID").val(),"feedback":text};
        $.ajax({
          type:"post",
          datatype:"json",
          data:json,
          url:"/api/feedback",
          success:function (rs){
            switch (rs.statue){
              case 2010:
                Swal.fire({
                  title: "反馈成功!",
                  text: rs.data,
                  icon: "success",
                  confirmButtonText: "感谢您的贡献",
                });
                return;
              case 2007:
                Swal.fire({
                  title: "反馈失败!",
                  text: rs.data,
                  icon: "error",
                  confirmButtonText: "确定",
                });
                return;
              case 1006:
                Swal.fire({
                  title: "反馈失败!",
                  text: rs.data,
                  icon: "error",
                  confirmButtonText: "确定",
                });
                return;
              case 2009:
                Swal.fire({
                  title: "反馈失败!",
                  text: rs.data,
                  icon: "error",
                  confirmButtonText: "确定",
                });
                return;
              case 1022:
                Swal.fire({
                  title: "反馈失败!",
                  text: rs.data,
                  icon: "error",
                  confirmButtonText: "确定",
                });
            }
          }
        })
      }

    })
  }