
<template>
  <div id="container">
    <div id="anitOut">
      <div class="login">
        <div class="title-box">
          <img class="logo" src="./../assets/img/logo.png">
          <div class="title">深圳市宝安区妇幼保健院-天使照护</div>
          <div class="title-en">Shenzhen Maternity & Child Healthcare hospital</div>
        </div>
        <div class="form">
          <form id="form">
            <div class="input-div">
              <input
                type="text"
                class="username"
                v-model="username"
                name="username"
                placeholder="请输入用户名"
              >
              <i class="fa user"></i>
            </div>
            <div class="input-div">
              <input
                type="password"
                class="password"
                v-model="password"
                name="password"
                placeholder="请输入密码"
              >
              <i class="fa lock"></i>
            </div>
          </form>
          <button class="login-but" @click="submit()">登录</button>
          <!-- <a href="https://xinshengerke.hbb.net/index.php?s=/addon/Common/WLogin/register.html">
            <div class="register">注册账号</div>
          </a>
          <a href="https://xinshengerke.hbb.net/index.php?s=/addon/Common/WLogin/retrieve.html">
            <div class="retrieve">修改密码</div>
          </a>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
function loginBack() {
  $(function($) {
    if (
      !window.ActiveXObject &&
      !!document.createElement("canvas").getContext
    ) {
      $.getScript(
        "http://im.qq.com/pcqq/js/200/cav.js?_=1428576021379",
        // $.getScript("/Addons/Common/View/default/Public/pcweb/loginBackground/cav.js",
        function() {
          var t = {
            width: 1.5,
            height: 1.5,
            depth: 10,
            segments: 12,
            slices: 6,
            xRange: 0.8,
            yRange: 0.1,
            zRange: 1,
            ambient: "#525252",
            diffuse: "#57a6f0",
            //diffuse: "#98E2FF",
            speed: 0.0002
          };
          var G = {
            count: 2,
            xyScalar: 1,
            zOffset: 100,
            ambient: "#0968ef",
            //ambient: "#168fc8",
            diffuse: "#005584",
            speed: 0.001,
            gravity: 1200,
            dampening: 0.95,
            minLimit: 10,
            maxLimit: null,
            minDistance: 20,
            maxDistance: 400,
            autopilot: false,
            draw: false,
            bounds: CAV.Vector3.create(),
            step: CAV.Vector3.create(
              Math.randomInRange(0.2, 1),
              Math.randomInRange(0.2, 1),
              Math.randomInRange(0.2, 1)
            )
          };
          var m = "canvas";
          var E = "svg";
          var x = {
            renderer: m
          };
          var i,
            n = Date.now();
          var L = CAV.Vector3.create();
          var k = CAV.Vector3.create();
          var z = document.getElementById("container");
          var w = document.getElementById("anitOut");
          var D, I, h, q, y;
          var g;
          var r;

          function C() {
            F();
            p();
            s();
            B();
            v();
            K(z.offsetWidth, z.offsetHeight);
            o();
          }

          function F() {
            g = new CAV.CanvasRenderer();
            H(x.renderer);
          }

          function H(N) {
            if (D) {
              w.removeChild(D.element);
            }
            switch (N) {
              case m:
                D = g;
                break;
            }
            D.setSize(z.offsetWidth, z.offsetHeight);
            w.appendChild(D.element);
          }

          function p() {
            I = new CAV.Scene();
          }

          function s() {
            I.remove(h);
            D.clear();
            q = new CAV.Plane(
              t.width * D.width,
              t.height * D.height,
              t.segments,
              t.slices
            );
            y = new CAV.Material(t.ambient, t.diffuse);
            h = new CAV.Mesh(q, y);
            I.add(h);
            var N, O;
            for (N = q.vertices.length - 1; N >= 0; N--) {
              O = q.vertices[N];
              O.anchor = CAV.Vector3.clone(O.position);
              O.step = CAV.Vector3.create(
                Math.randomInRange(0.2, 1),
                Math.randomInRange(0.2, 1),
                Math.randomInRange(0.2, 1)
              );
              O.time = Math.randomInRange(0, Math.PIM2);
            }
          }

          function B() {
            var O, N;
            for (O = I.lights.length - 1; O >= 0; O--) {
              N = I.lights[O];
              I.remove(N);
            }
            D.clear();
            for (O = 0; O < G.count; O++) {
              N = new CAV.Light(G.ambient, G.diffuse);
              N.ambientHex = N.ambient.format();
              N.diffuseHex = N.diffuse.format();
              I.add(N);
              N.mass = Math.randomInRange(0.5, 1);
              N.velocity = CAV.Vector3.create();
              N.acceleration = CAV.Vector3.create();
              N.force = CAV.Vector3.create();
            }
          }

          function K(O, N) {
            D.setSize(O, N);
            CAV.Vector3.set(L, D.halfWidth, D.halfHeight);
            s();
          }

          function o() {
            i = Date.now() - n;
            u();
            M();
            requestAnimationFrame(o);
          }

          function u() {
            var Q,
              P,
              O,
              R,
              T,
              V,
              U,
              S = t.depth / 2;
            CAV.Vector3.copy(G.bounds, L);
            CAV.Vector3.multiplyScalar(G.bounds, G.xyScalar);
            CAV.Vector3.setZ(k, G.zOffset);
            for (R = I.lights.length - 1; R >= 0; R--) {
              T = I.lights[R];
              CAV.Vector3.setZ(T.position, G.zOffset);
              var N = Math.clamp(
                CAV.Vector3.distanceSquared(T.position, k),
                G.minDistance,
                G.maxDistance
              );
              var W = (G.gravity * T.mass) / N;
              CAV.Vector3.subtractVectors(T.force, k, T.position);
              CAV.Vector3.normalise(T.force);
              CAV.Vector3.multiplyScalar(T.force, W);
              CAV.Vector3.set(T.acceleration);
              CAV.Vector3.add(T.acceleration, T.force);
              CAV.Vector3.add(T.velocity, T.acceleration);
              CAV.Vector3.multiplyScalar(T.velocity, G.dampening);
              CAV.Vector3.limit(T.velocity, G.minLimit, G.maxLimit);
              CAV.Vector3.add(T.position, T.velocity);
            }
            for (V = q.vertices.length - 1; V >= 0; V--) {
              U = q.vertices[V];
              Q = Math.sin(U.time + U.step[0] * i * t.speed);
              P = Math.cos(U.time + U.step[1] * i * t.speed);
              O = Math.sin(U.time + U.step[2] * i * t.speed);
              CAV.Vector3.set(
                U.position,
                t.xRange * q.segmentWidth * Q,
                t.yRange * q.sliceHeight * P,
                t.zRange * S * O - S
              );
              CAV.Vector3.add(U.position, U.anchor);
            }
            q.dirty = true;
          }

          function M() {
            D.render(I);
          }

          function J(O) {
            var Q,
              N,
              S = O;
            var P = function(T) {
              for (Q = 0, l = I.lights.length; Q < l; Q++) {
                N = I.lights[Q];
                N.ambient.set(T);
                N.ambientHex = N.ambient.format();
              }
            };
            var R = function(T) {
              for (Q = 0, l = I.lights.length; Q < l; Q++) {
                N = I.lights[Q];
                N.diffuse.set(T);
                N.diffuseHex = N.diffuse.format();
              }
            };
            return {
              set: function() {
                P(S[0]);
                R(S[1]);
              }
            };
          }

          function v() {
            window.addEventListener("resize", j);
          }

          function A(N) {
            CAV.Vector3.set(k, N.x, D.height - N.y);
            CAV.Vector3.subtract(k, L);
          }

          function j(N) {
            K(z.offsetWidth, z.offsetHeight);
            M();
          }

          C();
        }
      );
    } else {
      alert("调用cav.js失败");
    }
  });
}

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  created() {
    loginBack();
  },
  methods: {
    submit() {
      if (this.username == "") {
        alert("用户名不可为空!");
        return false;
      }
      if (this.password == "") {
        alert("密码不可为空!");
        return false;
      }
      //   $("#form").submit();
      this.$axios
        .post("/doctor/login", {
          username: this.username,
          passwd: this.password
        })
        .then(res => {
          if (res.data.result == 400) {
            this.$message.error(res.data.message);
            this.username = "";
            this.password = "";
            return;
          }
          if (res.data.result == 0) {
            this.$message({
              message: "登录成功",
              type: "success"
            });
            console.log(res.data.data);
            let LoginObj = {
              userid: res.data.data.userid,
              source: res.data.data.source,
              token: res.data.data.token,
              system: res.data.data.system
            };
            sessionStorage.setItem("userinfo", JSON.stringify(LoginObj));
            this.$router.push("/challengeList");
          } else {
            this.$message.error(res.data.message);
            return;
          }
        });
    }
  }
};
</script>
  <style>
#container {
  margin: auto;
  padding: 0;
  height: 100%;
  position: relative;
}
.login {
  text-align: center;
  height: 100%;
  width: 100%;
  position: absolute;
}
.title-box {
  width: 580px;
  margin: auto;
  padding-top: 15%;
  font-size: 32px;
  letter-spacing: 0;
  color: #ffffff;
}
.logo {
  float: left;
  margin-top: 8px;
  width: 60px;
  height: 60px;
}
.title {
  line-height: 40px;
}
.title-en {
  font-size: 22px;
  color: #ffffff;
  line-height: 40px;
}
.form {
  width: 260px;
  margin: 70px auto;
}
.input-div {
  position: relative;
}
.input-div input {
  width: 100%;
  height: 32px;
  padding-left: 30px;
  border: solid 1px rgba(255, 255, 255, 0.7);
  display: block;
  margin: 20px auto;
  color: #fff;
  background: rgba(0, 153, 255, 1) !important;
}
.input-div input::-webkit-input-placeholder {
  color: #fff;
}
.input-div i {
  position: absolute;
  top: 0px;
  left: 0px;
  color: #fff;
}
.user,
.lock {
  font-size: 17px;
  top: 8px;
  position: relative;
  width: 32px;
  height: 32px;
}
.user:before {
  content: "";
  position: absolute;
  left: 2px;
  top: 3px;
  width: 24px;
  height: 24px;
  background: url("../assets/img/user.png") top center no-repeat;
  background-size: cover;
}
.lock:before {
  content: "";
  position: absolute;
  left: 5px;
  top: 5px;
  width: 22px;
  height: 22px;
  background: url("../assets/img/password.png") top center no-repeat;
  background-size: cover;
}
.fa-lock,
.fa-mobile-phone {
  font-size: 17px;
  top: 8px;
}
button.login-but {
  width: 100%;
  height: 32px;
  background-color: #ffffff;
  border: solid 1px #ffffff;
  color: #168fc8;
}
.register {
  color: #ffffff;
  text-align: right;
  margin: 10px auto;
  cursor: pointer;
  float: left;
}
.retrieve {
  color: #ffffff;
  text-align: right;
  margin: 10px auto;
  cursor: pointer;
  float: right;
}
</style>


