(()=>{var yu=0,Bc=1,Ou=2;var Dr=1,Su=2,Mn=3,Ci=0,je=1,Ii=2,ln=0,Bn=1,Gc=2,Kc=3,Fc=4,Hu=5;var dn=100,Pu=101,xu=102,gu=103,Wu=104,ju=200,vu=201,Tu=202,Nu=203,Cc=204,Jc=205,Xu=206,Lu=207,Eu=208,zu=209,ku=210,wu=211,Uu=212,Du=213,Zu=214,Wa=0,ja=1,va=2,vn=3,Ta=4,Na=5,Xa=6,La=7,ds=0,Mu=1,Bu=2,hi=0,Qc=1,Yc=2,_c=3,$c=4,to=5,eo=6,io=7;var no=300,An=301,Gn=302,As=303,ps=304,Ea=1e3,oi=1001,za=1002,xe=1003,Gu=1004;var Zr=1005;var Ue=1006,fs=1007;var vi=1008;var De=1009,ro=1010,ao=1011,Kn=1012,Rs=1013,ri=1014,Je=1015,ai=1016,Is=1017,hs=1018,pn=1020,so=35902,co=35899,oo=1021,uo=1022,si=1023,gi=1026,Ti=1027,qs=1028,Vs=1029,Ji=1030,ms=1031;var bs=1033,Mr=33776,Br=33777,Gr=33778,Kr=33779,ys=35840,Os=35841,Ss=35842,Hs=35843,Ps=36196,xs=37492,gs=37496,Ws=37488,js=37489,Fr=37490,vs=37491,Ts=37808,Ns=37809,Xs=37810,Ls=37811,Es=37812,zs=37813,ks=37814,ws=37815,Us=37816,Ds=37817,Zs=37818,Ms=37819,Bs=37820,Gs=37821,Ks=36492,Fs=36494,Cs=36495,Js=36283,Qs=36284,Cr=36285,Ys=36286;var or=2300,ka=2301,Pa=2302,Tc=2303,Nc=2400,Xc=2401,Lc=2402;var Ku=3200;var Jr=0,Fu=1,Ni="",Le="srgb",ur="srgb-linear",lr="linear",ae="srgb";var xa=7680;var Cu=519,Ju=512,Qu=513,Yu=514,lo=515,_u=516,$u=517,Ao=518,po=519,tl=35044;var fo="300 es",Ce=2e3,Tn=2001;function Yl(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function _l(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Nn(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function el(){let n=Nn("canvas");return n.style.display="block",n}var Bo={},Xn=null;function Ro(...n){let t="THREE."+n.shift();Xn?Xn("log",t,...n):console.log(t,...n)}function il(n){let t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function zt(...n){n=il(n);let t="THREE."+n.shift();if(Xn)Xn("warn",t,...n);else{let e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function kt(...n){n=il(n);let t="THREE."+n.shift();if(Xn)Xn("error",t,...n);else{let e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function an(...n){let t=n.join(" ");t in Bo||(Bo[t]=!0,zt(...n))}function nl(n,t,e){return new Promise(function(i,r){function a(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(a,e);break;default:i()}}setTimeout(a,e)})}var rl={[Wa]:Wa,[va]:Xa,[Ta]:Ta,[vn]:Na,[ja]:ja,[Xa]:va,[La]:La,[Na]:vn},ui=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let r=i[t];if(r!==void 0){let a=r.indexOf(e);a!==-1&&r.splice(a,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let r=i.slice(0);for(let a=0,s=r.length;a<s;a++)r[a].call(this,t);t.target=null}}},Ne=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var cc=Math.PI/180,wa=180/Math.PI;function Fn(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ne[n&255]+Ne[n>>8&255]+Ne[n>>16&255]+Ne[n>>24&255]+"-"+Ne[t&255]+Ne[t>>8&255]+"-"+Ne[t>>16&15|64]+Ne[t>>24&255]+"-"+Ne[e&63|128]+Ne[e>>8&255]+"-"+Ne[e>>16&255]+Ne[e>>24&255]+Ne[i&255]+Ne[i>>8&255]+Ne[i>>16&255]+Ne[i>>24&255]).toLowerCase()}function Yt(n,t,e){return Math.max(t,Math.min(e,n))}function $l(n,t){return(n%t+t)%t}function oc(n,t,e){return(1-e)*n+e*t}function al(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Io(n){switch(n.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function td(n,t){if(t.constructor===Float32Array)return n;let e=Io(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(n/e,-1)}function ed(n,t){if(t.constructor===Float32Array)return n;let e=Io(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(n*e)}var qt=class{static{this.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6],this.y=r[1]*e+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Yt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Yt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),r=Math.sin(e),a=this.x-t.x,s=this.y-t.y;return this.x=a*i-s*r+t.x,this.y=a*r+s*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},li=class{constructor(t=0,e=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=r}static slerpFlat(t,e,i,r,a,s,c){let u=i[r+0],o=i[r+1],l=i[r+2],p=i[r+3],d=a[s+0],A=a[s+1],h=a[s+2],m=a[s+3];if(p!==m||u!==d||o!==A||l!==h){let f=u*d+o*A+l*h+p*m;f<0&&(d=-d,A=-A,h=-h,m=-m,f=-f);let R=1-c;if(f<.9995){let O=Math.acos(f),H=Math.sin(O);R=Math.sin(R*O)/H,c=Math.sin(c*O)/H,u=u*R+d*c,o=o*R+A*c,l=l*R+h*c,p=p*R+m*c}else{u=u*R+d*c,o=o*R+A*c,l=l*R+h*c,p=p*R+m*c;let O=1/Math.sqrt(u*u+o*o+l*l+p*p);u*=O,o*=O,l*=O,p*=O}}t[e]=u,t[e+1]=o,t[e+2]=l,t[e+3]=p}static multiplyQuaternionsFlat(t,e,i,r,a,s){let c=i[r],u=i[r+1],o=i[r+2],l=i[r+3],p=a[s],d=a[s+1],A=a[s+2],h=a[s+3];return t[e]=c*h+l*p+u*A-o*d,t[e+1]=u*h+l*d+o*p-c*A,t[e+2]=o*h+l*A+c*d-u*p,t[e+3]=l*h-c*p-u*d-o*A,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,r){return this._x=t,this._y=e,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,r=t._y,a=t._z,s=t._order,c=Math.cos,u=Math.sin,o=c(i/2),l=c(r/2),p=c(a/2),d=u(i/2),A=u(r/2),h=u(a/2);switch(s){case"XYZ":this._x=d*l*p+o*A*h,this._y=o*A*p-d*l*h,this._z=o*l*h+d*A*p,this._w=o*l*p-d*A*h;break;case"YXZ":this._x=d*l*p+o*A*h,this._y=o*A*p-d*l*h,this._z=o*l*h-d*A*p,this._w=o*l*p+d*A*h;break;case"ZXY":this._x=d*l*p-o*A*h,this._y=o*A*p+d*l*h,this._z=o*l*h+d*A*p,this._w=o*l*p-d*A*h;break;case"ZYX":this._x=d*l*p-o*A*h,this._y=o*A*p+d*l*h,this._z=o*l*h-d*A*p,this._w=o*l*p+d*A*h;break;case"YZX":this._x=d*l*p+o*A*h,this._y=o*A*p+d*l*h,this._z=o*l*h-d*A*p,this._w=o*l*p-d*A*h;break;case"XZY":this._x=d*l*p-o*A*h,this._y=o*A*p-d*l*h,this._z=o*l*h+d*A*p,this._w=o*l*p+d*A*h;break;default:zt("Quaternion: .setFromEuler() encountered an unknown order: "+s)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],r=e[4],a=e[8],s=e[1],c=e[5],u=e[9],o=e[2],l=e[6],p=e[10],d=i+c+p;if(d>0){let A=.5/Math.sqrt(d+1);this._w=.25/A,this._x=(l-u)*A,this._y=(a-o)*A,this._z=(s-r)*A}else if(i>c&&i>p){let A=2*Math.sqrt(1+i-c-p);this._w=(l-u)/A,this._x=.25*A,this._y=(r+s)/A,this._z=(a+o)/A}else if(c>p){let A=2*Math.sqrt(1+c-i-p);this._w=(a-o)/A,this._x=(r+s)/A,this._y=.25*A,this._z=(u+l)/A}else{let A=2*Math.sqrt(1+p-i-c);this._w=(s-r)/A,this._x=(a+o)/A,this._y=(u+l)/A,this._z=.25*A}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Yt(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let r=Math.min(1,e/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,r=t._y,a=t._z,s=t._w,c=e._x,u=e._y,o=e._z,l=e._w;return this._x=i*l+s*c+r*o-a*u,this._y=r*l+s*u+a*c-i*o,this._z=a*l+s*o+i*u-r*c,this._w=s*l-i*c-r*u-a*o,this._onChangeCallback(),this}slerp(t,e){let i=t._x,r=t._y,a=t._z,s=t._w,c=this.dot(t);c<0&&(i=-i,r=-r,a=-a,s=-s,c=-c);let u=1-e;if(c<.9995){let o=Math.acos(c),l=Math.sin(o);u=Math.sin(u*o)/l,e=Math.sin(e*o)/l,this._x=this._x*u+i*e,this._y=this._y*u+r*e,this._z=this._z*u+a*e,this._w=this._w*u+s*e,this._onChangeCallback()}else this._x=this._x*u+i*e,this._y=this._y*u+r*e,this._z=this._z*u+a*e,this._w=this._w*u+s*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),a*Math.sin(e),a*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},X=class{static{this.prototype.isVector3=!0}constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Go.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Go.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,r=this.z,a=t.elements;return this.x=a[0]*e+a[3]*i+a[6]*r,this.y=a[1]*e+a[4]*i+a[7]*r,this.z=a[2]*e+a[5]*i+a[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,r=this.z,a=t.elements,s=1/(a[3]*e+a[7]*i+a[11]*r+a[15]);return this.x=(a[0]*e+a[4]*i+a[8]*r+a[12])*s,this.y=(a[1]*e+a[5]*i+a[9]*r+a[13])*s,this.z=(a[2]*e+a[6]*i+a[10]*r+a[14])*s,this}applyQuaternion(t){let e=this.x,i=this.y,r=this.z,a=t.x,s=t.y,c=t.z,u=t.w,o=2*(s*r-c*i),l=2*(c*e-a*r),p=2*(a*i-s*e);return this.x=e+u*o+s*p-c*l,this.y=i+u*l+c*o-a*p,this.z=r+u*p+a*l-s*o,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,r=this.z,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*r,this.y=a[1]*e+a[5]*i+a[9]*r,this.z=a[2]*e+a[6]*i+a[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this.z=Yt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this.z=Yt(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Yt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,r=t.y,a=t.z,s=e.x,c=e.y,u=e.z;return this.x=r*u-a*c,this.y=a*s-i*u,this.z=i*c-r*s,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return uc.copy(this).projectOnVector(t),this.sub(uc)}reflect(t){return this.sub(uc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Yt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return e*e+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let r=Math.sin(e)*t;return this.x=r*Math.sin(i),this.y=Math.cos(e)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},uc=new X,Go=new li,Dt=class{static{this.prototype.isMatrix3=!0}constructor(t,e,i,r,a,s,c,u,o){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,r,a,s,c,u,o)}set(t,e,i,r,a,s,c,u,o){let l=this.elements;return l[0]=t,l[1]=r,l[2]=c,l[3]=e,l[4]=a,l[5]=u,l[6]=i,l[7]=s,l[8]=o,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,r=e.elements,a=this.elements,s=i[0],c=i[3],u=i[6],o=i[1],l=i[4],p=i[7],d=i[2],A=i[5],h=i[8],m=r[0],f=r[3],R=r[6],O=r[1],H=r[4],b=r[7],x=r[2],P=r[5],I=r[8];return a[0]=s*m+c*O+u*x,a[3]=s*f+c*H+u*P,a[6]=s*R+c*b+u*I,a[1]=o*m+l*O+p*x,a[4]=o*f+l*H+p*P,a[7]=o*R+l*b+p*I,a[2]=d*m+A*O+h*x,a[5]=d*f+A*H+h*P,a[8]=d*R+A*b+h*I,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],r=t[2],a=t[3],s=t[4],c=t[5],u=t[6],o=t[7],l=t[8];return e*s*l-e*c*o-i*a*l+i*c*u+r*a*o-r*s*u}invert(){let t=this.elements,e=t[0],i=t[1],r=t[2],a=t[3],s=t[4],c=t[5],u=t[6],o=t[7],l=t[8],p=l*s-c*o,d=c*u-l*a,A=o*a-s*u,h=e*p+i*d+r*A;if(h===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/h;return t[0]=p*m,t[1]=(r*o-l*i)*m,t[2]=(c*i-r*s)*m,t[3]=d*m,t[4]=(l*e-r*u)*m,t[5]=(r*a-c*e)*m,t[6]=A*m,t[7]=(i*u-o*e)*m,t[8]=(s*e-i*a)*m,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,r,a,s,c){let u=Math.cos(a),o=Math.sin(a);return this.set(i*u,i*o,-i*(u*s+o*c)+s+t,-r*o,r*u,-r*(-o*s+u*c)+c+e,0,0,1),this}scale(t,e){return an("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(lc.makeScale(t,e)),this}rotate(t){return an("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(lc.makeRotation(-t)),this}translate(t,e){return an("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(lc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let r=0;r<9;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},lc=new Dt,Ko=new Dt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Fo=new Dt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function id(){let n={enabled:!0,workingColorSpace:ur,spaces:{},convert:function(r,a,s){return this.enabled===!1||a===s||!a||!s||(this.spaces[a].transfer===ae&&(r.r=xi(r.r),r.g=xi(r.g),r.b=xi(r.b)),this.spaces[a].primaries!==this.spaces[s].primaries&&(r.applyMatrix3(this.spaces[a].toXYZ),r.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===ae&&(r.r=jn(r.r),r.g=jn(r.g),r.b=jn(r.b))),r},workingToColorSpace:function(r,a){return this.convert(r,this.workingColorSpace,a)},colorSpaceToWorking:function(r,a){return this.convert(r,a,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Ni?lr:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,a=this.workingColorSpace){return r.fromArray(this.spaces[a].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,a,s){return r.copy(this.spaces[s].fromXYZ).multiply(this.spaces[a].toXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[ur]:{primaries:t,whitePoint:i,transfer:lr,toXYZ:Ko,fromXYZ:Fo,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Le},outputColorSpaceConfig:{drawingBufferColorSpace:Le}},[Le]:{primaries:t,whitePoint:i,transfer:ae,toXYZ:Ko,fromXYZ:Fo,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Le}}}),n}var ee=id();function xi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function jn(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Rn,Ua=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Rn===void 0&&(Rn=Nn("canvas")),Rn.width=t.width,Rn.height=t.height;let r=Rn.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),i=Rn}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Nn("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let r=i.getImageData(0,0,t.width,t.height),a=r.data;for(let s=0;s<a.length;s++)a[s]=xi(a[s]/255)*255;return i.putImageData(r,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(xi(e[i]/255)*255):e[i]=xi(e[i]);return{data:e,width:t.width,height:t.height}}else return zt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},nd=0,Ln=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:nd++}),this.uuid=Fn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let s=0,c=r.length;s<c;s++)r[s].isDataTexture?a.push(dc(r[s].image)):a.push(dc(r[s]))}else a=dc(r);i.url=a}return e||(t.images[this.uuid]=i),i}};function dc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Ua.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(zt("Texture: Unable to serialize Texture."),{})}var rd=0,Ac=new X,ze=class n extends ui{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=oi,r=oi,a=Ue,s=vi,c=si,u=De,o=n.DEFAULT_ANISOTROPY,l=Ni){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:rd++}),this.uuid=Fn(),this.name="",this.source=new Ln(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=a,this.minFilter=s,this.anisotropy=o,this.format=c,this.internalFormat=null,this.type=u,this.offset=new qt(0,0),this.repeat=new qt(1,1),this.center=new qt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Dt,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=l,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Ac).x}get height(){return this.source.getSize(Ac).y}get depth(){return this.source.getSize(Ac).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let i=t[e];if(i===void 0){zt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let r=this[e];if(r===void 0){zt(`Texture.setValues(): property '${e}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==no)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ea:t.x=t.x-Math.floor(t.x);break;case oi:t.x=t.x<0?0:1;break;case za:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ea:t.y=t.y-Math.floor(t.y);break;case oi:t.y=t.y<0?0:1;break;case za:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};ze.DEFAULT_IMAGE=null;ze.DEFAULT_MAPPING=no;ze.DEFAULT_ANISOTROPY=1;var pe=class{static{this.prototype.isVector4=!0}constructor(t=0,e=0,i=0,r=1){this.x=t,this.y=e,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,r){return this.x=t,this.y=e,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,r=this.z,a=this.w,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*r+s[12]*a,this.y=s[1]*e+s[5]*i+s[9]*r+s[13]*a,this.z=s[2]*e+s[6]*i+s[10]*r+s[14]*a,this.w=s[3]*e+s[7]*i+s[11]*r+s[15]*a,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,r,a,u=t.elements,o=u[0],l=u[4],p=u[8],d=u[1],A=u[5],h=u[9],m=u[2],f=u[6],R=u[10];if(Math.abs(l-d)<.01&&Math.abs(p-m)<.01&&Math.abs(h-f)<.01){if(Math.abs(l+d)<.1&&Math.abs(p+m)<.1&&Math.abs(h+f)<.1&&Math.abs(o+A+R-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let H=(o+1)/2,b=(A+1)/2,x=(R+1)/2,P=(l+d)/4,I=(p+m)/4,y=(h+f)/4;return H>b&&H>x?H<.01?(i=0,r=.707106781,a=.707106781):(i=Math.sqrt(H),r=P/i,a=I/i):b>x?b<.01?(i=.707106781,r=0,a=.707106781):(r=Math.sqrt(b),i=P/r,a=y/r):x<.01?(i=.707106781,r=.707106781,a=0):(a=Math.sqrt(x),i=I/a,r=y/a),this.set(i,r,a,e),this}let O=Math.sqrt((f-h)*(f-h)+(p-m)*(p-m)+(d-l)*(d-l));return Math.abs(O)<.001&&(O=1),this.x=(f-h)/O,this.y=(p-m)/O,this.z=(d-l)/O,this.w=Math.acos((o+A+R-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this.z=Yt(this.z,t.z,e.z),this.w=Yt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this.z=Yt(this.z,t,e),this.w=Yt(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Yt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Da=class extends ui{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ue,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new pe(0,0,t,e),this.scissorTest=!1,this.viewport=new pe(0,0,t,e),this.textures=[];let r=i.count;for(let a=0;a<r;a++)this.textures[a]=new ze({width:t,height:e,depth:i.depth}),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Ue,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let r=Object.assign({},t.textures[e].image);this.textures[e].source=new Ln(r)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Be=class extends Da{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},dr=class extends ze{constructor(t=null,e=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=xe,this.minFilter=xe,this.wrapR=oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Za=class extends ze{constructor(t=null,e=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=xe,this.minFilter=xe,this.wrapR=oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var ce=class n{static{this.prototype.isMatrix4=!0}constructor(t,e,i,r,a,s,c,u,o,l,p,d,A,h,m,f){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,r,a,s,c,u,o,l,p,d,A,h,m,f)}set(t,e,i,r,a,s,c,u,o,l,p,d,A,h,m,f){let R=this.elements;return R[0]=t,R[4]=e,R[8]=i,R[12]=r,R[1]=a,R[5]=s,R[9]=c,R[13]=u,R[2]=o,R[6]=l,R[10]=p,R[14]=d,R[3]=A,R[7]=h,R[11]=m,R[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,i=t.elements,r=1/In.setFromMatrixColumn(t,0).length(),a=1/In.setFromMatrixColumn(t,1).length(),s=1/In.setFromMatrixColumn(t,2).length();return e[0]=i[0]*r,e[1]=i[1]*r,e[2]=i[2]*r,e[3]=0,e[4]=i[4]*a,e[5]=i[5]*a,e[6]=i[6]*a,e[7]=0,e[8]=i[8]*s,e[9]=i[9]*s,e[10]=i[10]*s,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,r=t.y,a=t.z,s=Math.cos(i),c=Math.sin(i),u=Math.cos(r),o=Math.sin(r),l=Math.cos(a),p=Math.sin(a);if(t.order==="XYZ"){let d=s*l,A=s*p,h=c*l,m=c*p;e[0]=u*l,e[4]=-u*p,e[8]=o,e[1]=A+h*o,e[5]=d-m*o,e[9]=-c*u,e[2]=m-d*o,e[6]=h+A*o,e[10]=s*u}else if(t.order==="YXZ"){let d=u*l,A=u*p,h=o*l,m=o*p;e[0]=d+m*c,e[4]=h*c-A,e[8]=s*o,e[1]=s*p,e[5]=s*l,e[9]=-c,e[2]=A*c-h,e[6]=m+d*c,e[10]=s*u}else if(t.order==="ZXY"){let d=u*l,A=u*p,h=o*l,m=o*p;e[0]=d-m*c,e[4]=-s*p,e[8]=h+A*c,e[1]=A+h*c,e[5]=s*l,e[9]=m-d*c,e[2]=-s*o,e[6]=c,e[10]=s*u}else if(t.order==="ZYX"){let d=s*l,A=s*p,h=c*l,m=c*p;e[0]=u*l,e[4]=h*o-A,e[8]=d*o+m,e[1]=u*p,e[5]=m*o+d,e[9]=A*o-h,e[2]=-o,e[6]=c*u,e[10]=s*u}else if(t.order==="YZX"){let d=s*u,A=s*o,h=c*u,m=c*o;e[0]=u*l,e[4]=m-d*p,e[8]=h*p+A,e[1]=p,e[5]=s*l,e[9]=-c*l,e[2]=-o*l,e[6]=A*p+h,e[10]=d-m*p}else if(t.order==="XZY"){let d=s*u,A=s*o,h=c*u,m=c*o;e[0]=u*l,e[4]=-p,e[8]=o*l,e[1]=d*p+m,e[5]=s*l,e[9]=A*p-h,e[2]=h*p-A,e[6]=c*l,e[10]=m*p+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ad,t,sd)}lookAt(t,e,i){let r=this.elements;return Ze.subVectors(t,e),Ze.lengthSq()===0&&(Ze.z=1),Ze.normalize(),Ei.crossVectors(i,Ze),Ei.lengthSq()===0&&(Math.abs(i.z)===1?Ze.x+=1e-4:Ze.z+=1e-4,Ze.normalize(),Ei.crossVectors(i,Ze)),Ei.normalize(),na.crossVectors(Ze,Ei),r[0]=Ei.x,r[4]=na.x,r[8]=Ze.x,r[1]=Ei.y,r[5]=na.y,r[9]=Ze.y,r[2]=Ei.z,r[6]=na.z,r[10]=Ze.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,r=e.elements,a=this.elements,s=i[0],c=i[4],u=i[8],o=i[12],l=i[1],p=i[5],d=i[9],A=i[13],h=i[2],m=i[6],f=i[10],R=i[14],O=i[3],H=i[7],b=i[11],x=i[15],P=r[0],I=r[4],y=r[8],L=r[12],j=r[1],N=r[5],z=r[9],G=r[13],W=r[2],Z=r[6],B=r[10],E=r[14],et=r[3],D=r[7],J=r[11],_=r[15];return a[0]=s*P+c*j+u*W+o*et,a[4]=s*I+c*N+u*Z+o*D,a[8]=s*y+c*z+u*B+o*J,a[12]=s*L+c*G+u*E+o*_,a[1]=l*P+p*j+d*W+A*et,a[5]=l*I+p*N+d*Z+A*D,a[9]=l*y+p*z+d*B+A*J,a[13]=l*L+p*G+d*E+A*_,a[2]=h*P+m*j+f*W+R*et,a[6]=h*I+m*N+f*Z+R*D,a[10]=h*y+m*z+f*B+R*J,a[14]=h*L+m*G+f*E+R*_,a[3]=O*P+H*j+b*W+x*et,a[7]=O*I+H*N+b*Z+x*D,a[11]=O*y+H*z+b*B+x*J,a[15]=O*L+H*G+b*E+x*_,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],r=t[8],a=t[12],s=t[1],c=t[5],u=t[9],o=t[13],l=t[2],p=t[6],d=t[10],A=t[14],h=t[3],m=t[7],f=t[11],R=t[15],O=u*A-o*d,H=c*A-o*p,b=c*d-u*p,x=s*A-o*l,P=s*d-u*l,I=s*p-c*l;return e*(m*O-f*H+R*b)-i*(h*O-f*x+R*P)+r*(h*H-m*x+R*I)-a*(h*b-m*P+f*I)}determinantAffine(){let t=this.elements,e=t[0],i=t[4],r=t[8],a=t[1],s=t[5],c=t[9],u=t[2],o=t[6],l=t[10];return e*(s*l-c*o)-i*(a*l-c*u)+r*(a*o-s*u)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],r=t[2],a=t[3],s=t[4],c=t[5],u=t[6],o=t[7],l=t[8],p=t[9],d=t[10],A=t[11],h=t[12],m=t[13],f=t[14],R=t[15],O=e*c-i*s,H=e*u-r*s,b=e*o-a*s,x=i*u-r*c,P=i*o-a*c,I=r*o-a*u,y=l*m-p*h,L=l*f-d*h,j=l*R-A*h,N=p*f-d*m,z=p*R-A*m,G=d*R-A*f,W=O*G-H*z+b*N+x*j-P*L+I*y;if(W===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let Z=1/W;return t[0]=(c*G-u*z+o*N)*Z,t[1]=(r*z-i*G-a*N)*Z,t[2]=(m*I-f*P+R*x)*Z,t[3]=(d*P-p*I-A*x)*Z,t[4]=(u*j-s*G-o*L)*Z,t[5]=(e*G-r*j+a*L)*Z,t[6]=(f*b-h*I-R*H)*Z,t[7]=(l*I-d*b+A*H)*Z,t[8]=(s*z-c*j+o*y)*Z,t[9]=(i*j-e*z-a*y)*Z,t[10]=(h*P-m*b+R*O)*Z,t[11]=(p*b-l*P-A*O)*Z,t[12]=(c*L-s*N-u*y)*Z,t[13]=(e*N-i*L+r*y)*Z,t[14]=(m*H-h*x-f*O)*Z,t[15]=(l*x-p*H+d*O)*Z,this}scale(t){let e=this.elements,i=t.x,r=t.y,a=t.z;return e[0]*=i,e[4]*=r,e[8]*=a,e[1]*=i,e[5]*=r,e[9]*=a,e[2]*=i,e[6]*=r,e[10]*=a,e[3]*=i,e[7]*=r,e[11]*=a,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,r))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),r=Math.sin(e),a=1-i,s=t.x,c=t.y,u=t.z,o=a*s,l=a*c;return this.set(o*s+i,o*c-r*u,o*u+r*c,0,o*c+r*u,l*c+i,l*u-r*s,0,o*u-r*c,l*u+r*s,a*u*u+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,r,a,s){return this.set(1,i,a,0,t,1,s,0,e,r,1,0,0,0,0,1),this}compose(t,e,i){let r=this.elements,a=e._x,s=e._y,c=e._z,u=e._w,o=a+a,l=s+s,p=c+c,d=a*o,A=a*l,h=a*p,m=s*l,f=s*p,R=c*p,O=u*o,H=u*l,b=u*p,x=i.x,P=i.y,I=i.z;return r[0]=(1-(m+R))*x,r[1]=(A+b)*x,r[2]=(h-H)*x,r[3]=0,r[4]=(A-b)*P,r[5]=(1-(d+R))*P,r[6]=(f+O)*P,r[7]=0,r[8]=(h+H)*I,r[9]=(f-O)*I,r[10]=(1-(d+m))*I,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,i){let r=this.elements;t.x=r[12],t.y=r[13],t.z=r[14];let a=this.determinantAffine();if(a===0)return i.set(1,1,1),e.identity(),this;let s=In.set(r[0],r[1],r[2]).length(),c=In.set(r[4],r[5],r[6]).length(),u=In.set(r[8],r[9],r[10]).length();a<0&&(s=-s),_e.copy(this);let o=1/s,l=1/c,p=1/u;return _e.elements[0]*=o,_e.elements[1]*=o,_e.elements[2]*=o,_e.elements[4]*=l,_e.elements[5]*=l,_e.elements[6]*=l,_e.elements[8]*=p,_e.elements[9]*=p,_e.elements[10]*=p,e.setFromRotationMatrix(_e),i.x=s,i.y=c,i.z=u,this}makePerspective(t,e,i,r,a,s,c=Ce,u=!1){let o=this.elements,l=2*a/(e-t),p=2*a/(i-r),d=(e+t)/(e-t),A=(i+r)/(i-r),h,m;if(u)h=a/(s-a),m=s*a/(s-a);else if(c===Ce)h=-(s+a)/(s-a),m=-2*s*a/(s-a);else if(c===Tn)h=-s/(s-a),m=-s*a/(s-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return o[0]=l,o[4]=0,o[8]=d,o[12]=0,o[1]=0,o[5]=p,o[9]=A,o[13]=0,o[2]=0,o[6]=0,o[10]=h,o[14]=m,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(t,e,i,r,a,s,c=Ce,u=!1){let o=this.elements,l=2/(e-t),p=2/(i-r),d=-(e+t)/(e-t),A=-(i+r)/(i-r),h,m;if(u)h=1/(s-a),m=s/(s-a);else if(c===Ce)h=-2/(s-a),m=-(s+a)/(s-a);else if(c===Tn)h=-1/(s-a),m=-a/(s-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return o[0]=l,o[4]=0,o[8]=0,o[12]=d,o[1]=0,o[5]=p,o[9]=0,o[13]=A,o[2]=0,o[6]=0,o[10]=h,o[14]=m,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let r=0;r<16;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}},In=new X,_e=new ce,ad=new X(0,0,0),sd=new X(1,1,1),Ei=new X,na=new X,Ze=new X,Co=new ce,Jo=new li,di=class n{constructor(t=0,e=0,i=0,r=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,r=this._order){return this._x=t,this._y=e,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let r=t.elements,a=r[0],s=r[4],c=r[8],u=r[1],o=r[5],l=r[9],p=r[2],d=r[6],A=r[10];switch(e){case"XYZ":this._y=Math.asin(Yt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-l,A),this._z=Math.atan2(-s,a)):(this._x=Math.atan2(d,o),this._z=0);break;case"YXZ":this._x=Math.asin(-Yt(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(c,A),this._z=Math.atan2(u,o)):(this._y=Math.atan2(-p,a),this._z=0);break;case"ZXY":this._x=Math.asin(Yt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-p,A),this._z=Math.atan2(-s,o)):(this._y=0,this._z=Math.atan2(u,a));break;case"ZYX":this._y=Math.asin(-Yt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(d,A),this._z=Math.atan2(u,a)):(this._x=0,this._z=Math.atan2(-s,o));break;case"YZX":this._z=Math.asin(Yt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-l,o),this._y=Math.atan2(-p,a)):(this._x=0,this._y=Math.atan2(c,A));break;case"XZY":this._z=Math.asin(-Yt(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(d,o),this._y=Math.atan2(c,a)):(this._x=Math.atan2(-l,A),this._y=0);break;default:zt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Co.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Co,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Jo.setFromEuler(this),this.setFromQuaternion(Jo,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};di.DEFAULT_ORDER="XYZ";var Ar=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},cd=0,Qo=new X,hn=new li,bi=new ce,ra=new X,$n=new X,od=new X,ud=new li,Yo=new X(1,0,0),_o=new X(0,1,0),$o=new X(0,0,1),tu={type:"added"},ld={type:"removed"},qn={type:"childadded",child:null},pc={type:"childremoved",child:null},We=class n extends ui{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:cd++}),this.uuid=Fn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new X,e=new di,i=new li,r=new X(1,1,1);function a(){i.setFromEuler(e,!1)}function s(){e.setFromQuaternion(i,void 0,!1)}e._onChange(a),i._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ce},normalMatrix:{value:new Dt}}),this.matrix=new ce,this.matrixWorld=new ce,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ar,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return hn.setFromAxisAngle(t,e),this.quaternion.multiply(hn),this}rotateOnWorldAxis(t,e){return hn.setFromAxisAngle(t,e),this.quaternion.premultiply(hn),this}rotateX(t){return this.rotateOnAxis(Yo,t)}rotateY(t){return this.rotateOnAxis(_o,t)}rotateZ(t){return this.rotateOnAxis($o,t)}translateOnAxis(t,e){return Qo.copy(t).applyQuaternion(this.quaternion),this.position.add(Qo.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Yo,t)}translateY(t){return this.translateOnAxis(_o,t)}translateZ(t){return this.translateOnAxis($o,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(bi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?ra.copy(t):ra.set(t,e,i);let r=this.parent;this.updateWorldMatrix(!0,!1),$n.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bi.lookAt($n,ra,this.up):bi.lookAt(ra,$n,this.up),this.quaternion.setFromRotationMatrix(bi),r&&(bi.extractRotation(r.matrixWorld),hn.setFromRotationMatrix(bi),this.quaternion.premultiply(hn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(kt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(tu),qn.child=t,this.dispatchEvent(qn),qn.child=null):kt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(ld),pc.child=t,this.dispatchEvent(pc),pc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),bi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),bi.multiply(t.parent.matrixWorld)),t.applyMatrix4(bi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(tu),qn.child=t,this.dispatchEvent(qn),qn.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,r=this.children.length;i<r;i++){let s=this.children[i].getObjectByProperty(t,e);if(s!==void 0)return s}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let r=this.children;for(let a=0,s=r.length;a<s;a++)r[a].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($n,t,od),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($n,ud,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);let e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,i=t.y,r=t.z,a=this.matrix.elements;a[12]+=e-a[0]*e-a[4]*i-a[8]*r,a[13]+=i-a[1]*e-a[5]*i-a[9]*r,a[14]+=r-a[2]*e-a[6]*i-a[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){let r=this.parent;if(t===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){let a=this.children;for(let s=0,c=a.length;s<c;s++)a[s].updateWorldMatrix(!1,!0,i)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(c=>({...c,boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(c=>({...c})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(t),r.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function a(c,u){return c[u.uuid]===void 0&&(c[u.uuid]=u.toJSON(t)),u.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(t.geometries,this.geometry);let c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){let u=c.shapes;if(Array.isArray(u))for(let o=0,l=u.length;o<l;o++){let p=u[o];a(t.shapes,p)}else a(t.shapes,u)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let c=[];for(let u=0,o=this.material.length;u<o;u++)c.push(a(t.materials,this.material[u]));r.material=c}else r.material=a(t.materials,this.material);if(this.children.length>0){r.children=[];for(let c=0;c<this.children.length;c++)r.children.push(this.children[c].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let c=0;c<this.animations.length;c++){let u=this.animations[c];r.animations.push(a(t.animations,u))}}if(e){let c=s(t.geometries),u=s(t.materials),o=s(t.textures),l=s(t.images),p=s(t.shapes),d=s(t.skeletons),A=s(t.animations),h=s(t.nodes);c.length>0&&(i.geometries=c),u.length>0&&(i.materials=u),o.length>0&&(i.textures=o),l.length>0&&(i.images=l),p.length>0&&(i.shapes=p),d.length>0&&(i.skeletons=d),A.length>0&&(i.animations=A),h.length>0&&(i.nodes=h)}return i.object=r,i;function s(c){let u=[];for(let o in c){let l=c[o];delete l.metadata,u.push(l)}return u}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let r=t.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};We.DEFAULT_UP=new X(0,1,0);We.DEFAULT_MATRIX_AUTO_UPDATE=!0;We.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Pi=class extends We{constructor(){super(),this.isGroup=!0,this.type="Group"}},dd={type:"move"},En=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new X,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new X),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new X,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new X,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let r=null,a=null,s=null,c=this._targetRay,u=this._grip,o=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(o&&t.hand){s=!0;for(let m of t.hand.values()){let f=e.getJointPose(m,i),R=this._getHandJoint(o,m);f!==null&&(R.matrix.fromArray(f.transform.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale),R.matrixWorldNeedsUpdate=!0,R.jointRadius=f.radius),R.visible=f!==null}let l=o.joints["index-finger-tip"],p=o.joints["thumb-tip"],d=l.position.distanceTo(p.position),A=.02,h=.005;o.inputState.pinching&&d>A+h?(o.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!o.inputState.pinching&&d<=A-h&&(o.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else u!==null&&t.gripSpace&&(a=e.getPose(t.gripSpace,i),a!==null&&(u.matrix.fromArray(a.transform.matrix),u.matrix.decompose(u.position,u.quaternion,u.scale),u.matrixWorldNeedsUpdate=!0,a.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(a.linearVelocity)):u.hasLinearVelocity=!1,a.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(a.angularVelocity)):u.hasAngularVelocity=!1,u.eventsEnabled&&u.dispatchEvent({type:"gripUpdated",data:t,target:this})));c!==null&&(r=e.getPose(t.targetRaySpace,i),r===null&&a!==null&&(r=a),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(dd)))}return c!==null&&(c.visible=r!==null),u!==null&&(u.visible=a!==null),o!==null&&(o.visible=s!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new Pi;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},sl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zi={h:0,s:0,l:0},aa={h:0,s:0,l:0};function fc(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var Gt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Le){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ee.colorSpaceToWorking(this,e),this}setRGB(t,e,i,r=ee.workingColorSpace){return this.r=t,this.g=e,this.b=i,ee.colorSpaceToWorking(this,r),this}setHSL(t,e,i,r=ee.workingColorSpace){if(t=$l(t,1),e=Yt(e,0,1),i=Yt(i,0,1),e===0)this.r=this.g=this.b=i;else{let a=i<=.5?i*(1+e):i+e-i*e,s=2*i-a;this.r=fc(s,a,t+1/3),this.g=fc(s,a,t),this.b=fc(s,a,t-1/3)}return ee.colorSpaceToWorking(this,r),this}setStyle(t,e=Le){function i(a){a!==void 0&&parseFloat(a)<1&&zt("Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let a,s=r[1],c=r[2];switch(s){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(c))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,e);if(a=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(c))return i(a[4]),this.setRGB(Math.min(100,parseFloat(a[1]))/100,Math.min(100,parseFloat(a[2]))/100,Math.min(100,parseFloat(a[3]))/100,e);break;case"hsl":case"hsla":if(a=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(c))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,e);break;default:zt("Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){let a=r[1],s=a.length;if(s===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,e);if(s===6)return this.setHex(parseInt(a,16),e);zt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Le){let i=sl[t.toLowerCase()];return i!==void 0?this.setHex(i,e):zt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=xi(t.r),this.g=xi(t.g),this.b=xi(t.b),this}copyLinearToSRGB(t){return this.r=jn(t.r),this.g=jn(t.g),this.b=jn(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Le){return ee.workingToColorSpace(Xe.copy(this),t),Math.round(Yt(Xe.r*255,0,255))*65536+Math.round(Yt(Xe.g*255,0,255))*256+Math.round(Yt(Xe.b*255,0,255))}getHexString(t=Le){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ee.workingColorSpace){ee.workingToColorSpace(Xe.copy(this),e);let i=Xe.r,r=Xe.g,a=Xe.b,s=Math.max(i,r,a),c=Math.min(i,r,a),u,o,l=(c+s)/2;if(c===s)u=0,o=0;else{let p=s-c;switch(o=l<=.5?p/(s+c):p/(2-s-c),s){case i:u=(r-a)/p+(r<a?6:0);break;case r:u=(a-i)/p+2;break;case a:u=(i-r)/p+4;break}u/=6}return t.h=u,t.s=o,t.l=l,t}getRGB(t,e=ee.workingColorSpace){return ee.workingToColorSpace(Xe.copy(this),e),t.r=Xe.r,t.g=Xe.g,t.b=Xe.b,t}getStyle(t=Le){ee.workingToColorSpace(Xe.copy(this),t);let e=Xe.r,i=Xe.g,r=Xe.b;return t!==Le?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,e,i){return this.getHSL(zi),this.setHSL(zi.h+t,zi.s+e,zi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(zi),t.getHSL(aa);let i=oc(zi.h,aa.h,e),r=oc(zi.s,aa.s,e),a=oc(zi.l,aa.l,e);return this.setHSL(i,r,a),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,r=this.b,a=t.elements;return this.r=a[0]*e+a[3]*i+a[6]*r,this.g=a[1]*e+a[4]*i+a[7]*r,this.b=a[2]*e+a[5]*i+a[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Xe=new Gt;Gt.NAMES=sl;var sn=class extends We{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new di,this.environmentIntensity=1,this.environmentRotation=new di,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},$e=new X,yi=new X,Rc=new X,Oi=new X,Vn=new X,mn=new X,eu=new X,Ic=new X,hc=new X,qc=new X,Vc=new pe,mc=new pe,bc=new pe,Di=class n{constructor(t=new X,e=new X,i=new X){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,r){r.subVectors(i,e),$e.subVectors(t,e),r.cross($e);let a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(t,e,i,r,a){$e.subVectors(r,e),yi.subVectors(i,e),Rc.subVectors(t,e);let s=$e.dot($e),c=$e.dot(yi),u=$e.dot(Rc),o=yi.dot(yi),l=yi.dot(Rc),p=s*o-c*c;if(p===0)return a.set(0,0,0),null;let d=1/p,A=(o*u-c*l)*d,h=(s*l-c*u)*d;return a.set(1-A-h,h,A)}static containsPoint(t,e,i,r){return this.getBarycoord(t,e,i,r,Oi)===null?!1:Oi.x>=0&&Oi.y>=0&&Oi.x+Oi.y<=1}static getInterpolation(t,e,i,r,a,s,c,u){return this.getBarycoord(t,e,i,r,Oi)===null?(u.x=0,u.y=0,"z"in u&&(u.z=0),"w"in u&&(u.w=0),null):(u.setScalar(0),u.addScaledVector(a,Oi.x),u.addScaledVector(s,Oi.y),u.addScaledVector(c,Oi.z),u)}static getInterpolatedAttribute(t,e,i,r,a,s){return Vc.setScalar(0),mc.setScalar(0),bc.setScalar(0),Vc.fromBufferAttribute(t,e),mc.fromBufferAttribute(t,i),bc.fromBufferAttribute(t,r),s.setScalar(0),s.addScaledVector(Vc,a.x),s.addScaledVector(mc,a.y),s.addScaledVector(bc,a.z),s}static isFrontFacing(t,e,i,r){return $e.subVectors(i,e),yi.subVectors(t,e),$e.cross(yi).dot(r)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,r){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,i,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return $e.subVectors(this.c,this.b),yi.subVectors(this.a,this.b),$e.cross(yi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,r,a){return n.getInterpolation(t,this.a,this.b,this.c,e,i,r,a)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,r=this.b,a=this.c,s,c;Vn.subVectors(r,i),mn.subVectors(a,i),Ic.subVectors(t,i);let u=Vn.dot(Ic),o=mn.dot(Ic);if(u<=0&&o<=0)return e.copy(i);hc.subVectors(t,r);let l=Vn.dot(hc),p=mn.dot(hc);if(l>=0&&p<=l)return e.copy(r);let d=u*p-l*o;if(d<=0&&u>=0&&l<=0&&u-l>0)return s=u/(u-l),e.copy(i).addScaledVector(Vn,s);qc.subVectors(t,a);let A=Vn.dot(qc),h=mn.dot(qc);if(h>=0&&A<=h)return e.copy(a);let m=A*o-u*h;if(m<=0&&o>=0&&h<=0)return c=o/(o-h),e.copy(i).addScaledVector(mn,c);let f=l*h-A*p;if(f<=0&&p-l>=0&&A-h>=0)return eu.subVectors(a,r),c=(p-l)/(p-l+(A-h)),e.copy(r).addScaledVector(eu,c);let R=1/(f+m+d);return s=m*R,c=d*R,e.copy(i).addScaledVector(Vn,s).addScaledVector(mn,c)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Ai=class{constructor(t=new X(1/0,1/0,1/0),e=new X(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(ti.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(ti.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=ti.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let a=i.getAttribute("position");if(e===!0&&a!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let s=0,c=a.count;s<c;s++)t.isMesh===!0?t.getVertexPosition(s,ti):ti.fromBufferAttribute(a,s),ti.applyMatrix4(t.matrixWorld),this.expandByPoint(ti);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),sa.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),sa.copy(i.boundingBox)),sa.applyMatrix4(t.matrixWorld),this.union(sa)}let r=t.children;for(let a=0,s=r.length;a<s;a++)this.expandByObject(r[a],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ti),ti.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(tr),ca.subVectors(this.max,tr),bn.subVectors(t.a,tr),yn.subVectors(t.b,tr),On.subVectors(t.c,tr),ki.subVectors(yn,bn),wi.subVectors(On,yn),$i.subVectors(bn,On);let e=[0,-ki.z,ki.y,0,-wi.z,wi.y,0,-$i.z,$i.y,ki.z,0,-ki.x,wi.z,0,-wi.x,$i.z,0,-$i.x,-ki.y,ki.x,0,-wi.y,wi.x,0,-$i.y,$i.x,0];return!yc(e,bn,yn,On,ca)||(e=[1,0,0,0,1,0,0,0,1],!yc(e,bn,yn,On,ca))?!1:(oa.crossVectors(ki,wi),e=[oa.x,oa.y,oa.z],yc(e,bn,yn,On,ca))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ti).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ti).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Si),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Si=[new X,new X,new X,new X,new X,new X,new X,new X],ti=new X,sa=new Ai,bn=new X,yn=new X,On=new X,ki=new X,wi=new X,$i=new X,tr=new X,ca=new X,oa=new X,tn=new X;function yc(n,t,e,i,r){for(let a=0,s=n.length-3;a<=s;a+=3){tn.fromArray(n,a);let c=r.x*Math.abs(tn.x)+r.y*Math.abs(tn.y)+r.z*Math.abs(tn.z),u=t.dot(tn),o=e.dot(tn),l=i.dot(tn);if(Math.max(-Math.max(u,o,l),Math.min(u,o,l))>c)return!1}return!0}var me=new X,ua=new qt,Ad=0,ii=class extends ui{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ad++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=tl,this.updateRanges=[],this.gpuType=Je,this.version=0,this._normalizationScale=t!==void 0?Io(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[t+r]=e.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)ua.fromBufferAttribute(this,e),ua.applyMatrix3(t),this.setXY(e,ua.x,ua.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)me.fromBufferAttribute(this,e),me.applyMatrix3(t),this.setXYZ(e,me.x,me.y,me.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)me.fromBufferAttribute(this,e),me.applyMatrix4(t),this.setXYZ(e,me.x,me.y,me.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)me.fromBufferAttribute(this,e),me.applyNormalMatrix(t),this.setXYZ(e,me.x,me.y,me.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)me.fromBufferAttribute(this,e),me.transformDirection(t),this.setXYZ(e,me.x,me.y,me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=this._denormalize(i)),i}setComponent(t,e,i){return this.normalized&&(i=this._normalize(i)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),i=this._normalize(i)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),i=this._normalize(i),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,e,i,r,a){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),i=this._normalize(i),r=this._normalize(r),a=this._normalize(a)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=a,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):td(t,this.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):ed(t,this.array)}};var pr=class extends ii{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var fr=class extends ii{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var be=class extends ii{constructor(t,e,i){super(new Float32Array(t),e,i)}},pd=new Ai,er=new X,Oc=new X,Zi=class{constructor(t=new X,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):pd.setFromPoints(t).getCenter(i);let r=0;for(let a=0,s=t.length;a<s;a++)r=Math.max(r,i.distanceToSquared(t[a]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;er.subVectors(t,this.center);let e=er.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),r=(i-this.radius)*.5;this.center.addScaledVector(er,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Oc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(er.copy(t.center).add(Oc)),this.expandByPoint(er.copy(t.center).sub(Oc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},fd=0,Fe=new ce,Sc=new We,Sn=new X,Me=new Ai,ir=new Ai,Pe=new X,ni=class n extends ui{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:fd++}),this.uuid=Fn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Yl(t)?fr:pr)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let a=new Dt().getNormalMatrix(t);i.applyNormalMatrix(a),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Fe.makeRotationFromQuaternion(t),this.applyMatrix4(Fe),this}rotateX(t){return Fe.makeRotationX(t),this.applyMatrix4(Fe),this}rotateY(t){return Fe.makeRotationY(t),this.applyMatrix4(Fe),this}rotateZ(t){return Fe.makeRotationZ(t),this.applyMatrix4(Fe),this}translate(t,e,i){return Fe.makeTranslation(t,e,i),this.applyMatrix4(Fe),this}scale(t,e,i){return Fe.makeScale(t,e,i),this.applyMatrix4(Fe),this}lookAt(t){return Sc.lookAt(t),Sc.updateMatrix(),this.applyMatrix4(Sc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Sn).negate(),this.translate(Sn.x,Sn.y,Sn.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let r=0,a=t.length;r<a;r++){let s=t[r];i.push(s.x,s.y,s.z||0)}this.setAttribute("position",new be(i,3))}else{let i=Math.min(t.length,e.count);for(let r=0;r<i;r++){let a=t[r];e.setXYZ(r,a.x,a.y,a.z||0)}t.length>e.count&&zt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ai);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){kt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new X(-1/0,-1/0,-1/0),new X(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,r=e.length;i<r;i++){let a=e[i];Me.setFromBufferAttribute(a),this.morphTargetsRelative?(Pe.addVectors(this.boundingBox.min,Me.min),this.boundingBox.expandByPoint(Pe),Pe.addVectors(this.boundingBox.max,Me.max),this.boundingBox.expandByPoint(Pe)):(this.boundingBox.expandByPoint(Me.min),this.boundingBox.expandByPoint(Me.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&kt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Zi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){kt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new X,1/0);return}if(t){let i=this.boundingSphere.center;if(Me.setFromBufferAttribute(t),e)for(let a=0,s=e.length;a<s;a++){let c=e[a];ir.setFromBufferAttribute(c),this.morphTargetsRelative?(Pe.addVectors(Me.min,ir.min),Me.expandByPoint(Pe),Pe.addVectors(Me.max,ir.max),Me.expandByPoint(Pe)):(Me.expandByPoint(ir.min),Me.expandByPoint(ir.max))}Me.getCenter(i);let r=0;for(let a=0,s=t.count;a<s;a++)Pe.fromBufferAttribute(t,a),r=Math.max(r,i.distanceToSquared(Pe));if(e)for(let a=0,s=e.length;a<s;a++){let c=e[a],u=this.morphTargetsRelative;for(let o=0,l=c.count;o<l;o++)Pe.fromBufferAttribute(c,o),u&&(Sn.fromBufferAttribute(t,o),Pe.add(Sn)),r=Math.max(r,i.distanceToSquared(Pe))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&kt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){kt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,r=e.normal,a=e.uv,s=this.getAttribute("tangent");(s===void 0||s.count!==i.count)&&(s=new ii(new Float32Array(4*i.count),4),this.setAttribute("tangent",s));let c=[],u=[],o=new Uint8Array(i.count);for(let L=0;L<i.count;L++)c[L]=new X,u[L]=new X;let l=new X,p=new X,d=new X,A=new qt,h=new qt,m=new qt,f=new X,R=new X;function O(L,j,N){o[L]=o[j]=o[N]=1,l.fromBufferAttribute(i,L),p.fromBufferAttribute(i,j),d.fromBufferAttribute(i,N),A.fromBufferAttribute(a,L),h.fromBufferAttribute(a,j),m.fromBufferAttribute(a,N),p.sub(l),d.sub(l),h.sub(A),m.sub(A);let z=1/(h.x*m.y-m.x*h.y);isFinite(z)&&(f.copy(p).multiplyScalar(m.y).addScaledVector(d,-h.y).multiplyScalar(z),R.copy(d).multiplyScalar(h.x).addScaledVector(p,-m.x).multiplyScalar(z),c[L].add(f),c[j].add(f),c[N].add(f),u[L].add(R),u[j].add(R),u[N].add(R))}let H=this.groups;H.length===0&&(H=[{start:0,count:t.count}]);for(let L=0,j=H.length;L<j;++L){let N=H[L],z=N.start,G=N.count;for(let W=z,Z=z+G;W<Z;W+=3)O(t.getX(W+0),t.getX(W+1),t.getX(W+2))}let b=new X,x=new X,P=new X,I=new X;function y(L){P.fromBufferAttribute(r,L),I.copy(P);let j=c[L];b.copy(j),b.sub(P.multiplyScalar(P.dot(j))).normalize(),x.crossVectors(I,j);let z=x.dot(u[L])<0?-1:1;s.setXYZW(L,b.x,b.y,b.z,z)}for(let L=0,j=i.count;L<j;++L)o[L]&&y(L);this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new ii(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,A=i.count;d<A;d++)i.setXYZ(d,0,0,0);let r=new X,a=new X,s=new X,c=new X,u=new X,o=new X,l=new X,p=new X;if(t)for(let d=0,A=t.count;d<A;d+=3){let h=t.getX(d+0),m=t.getX(d+1),f=t.getX(d+2);r.fromBufferAttribute(e,h),a.fromBufferAttribute(e,m),s.fromBufferAttribute(e,f),l.subVectors(s,a),p.subVectors(r,a),l.cross(p),c.fromBufferAttribute(i,h),u.fromBufferAttribute(i,m),o.fromBufferAttribute(i,f),c.add(l),u.add(l),o.add(l),i.setXYZ(h,c.x,c.y,c.z),i.setXYZ(m,u.x,u.y,u.z),i.setXYZ(f,o.x,o.y,o.z)}else for(let d=0,A=e.count;d<A;d+=3)r.fromBufferAttribute(e,d+0),a.fromBufferAttribute(e,d+1),s.fromBufferAttribute(e,d+2),l.subVectors(s,a),p.subVectors(r,a),l.cross(p),i.setXYZ(d+0,l.x,l.y,l.z),i.setXYZ(d+1,l.x,l.y,l.z),i.setXYZ(d+2,l.x,l.y,l.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Pe.fromBufferAttribute(t,e),Pe.normalize(),t.setXYZ(e,Pe.x,Pe.y,Pe.z)}toNonIndexed(){function t(c,u){let o=c.array,l=c.itemSize,p=c.normalized,d=new o.constructor(u.length*l),A=0,h=0;for(let m=0,f=u.length;m<f;m++){c.isInterleavedBufferAttribute?A=u[m]*c.data.stride+c.offset:A=u[m]*l;for(let R=0;R<l;R++)d[h++]=o[A++]}return new ii(d,l,p)}if(this.index===null)return zt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,r=this.attributes;for(let c in r){let u=r[c],o=t(u,i);e.setAttribute(c,o)}let a=this.morphAttributes;for(let c in a){let u=[],o=a[c];for(let l=0,p=o.length;l<p;l++){let d=o[l],A=t(d,i);u.push(A)}e.morphAttributes[c]=u}e.morphTargetsRelative=this.morphTargetsRelative;let s=this.groups;for(let c=0,u=s.length;c<u;c++){let o=s[c];e.addGroup(o.start,o.count,o.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let u=this.parameters;for(let o in u)u[o]!==void 0&&(t[o]=u[o]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let u in i){let o=i[u];t.data.attributes[u]=o.toJSON(t.data)}let r={},a=!1;for(let u in this.morphAttributes){let o=this.morphAttributes[u],l=[];for(let p=0,d=o.length;p<d;p++){let A=o[p];l.push(A.toJSON(t.data))}l.length>0&&(r[u]=l,a=!0)}a&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);let s=this.groups;s.length>0&&(t.data.groups=JSON.parse(JSON.stringify(s)));let c=this.boundingSphere;return c!==null&&(t.data.boundingSphere=c.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let r=t.attributes;for(let o in r){let l=r[o];this.setAttribute(o,l.clone(e))}let a=t.morphAttributes;for(let o in a){let l=[],p=a[o];for(let d=0,A=p.length;d<A;d++)l.push(p[d].clone(e));this.morphAttributes[o]=l}this.morphTargetsRelative=t.morphTargetsRelative;let s=t.groups;for(let o=0,l=s.length;o<l;o++){let p=s[o];this.addGroup(p.start,p.count,p.materialIndex)}let c=t.boundingBox;c!==null&&(this.boundingBox=c.clone());let u=t.boundingSphere;return u!==null&&(this.boundingSphere=u.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Hc=new X,Rd=new X,Id=new Dt,ei=class{constructor(t=new X(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,r){return this.normal.set(t,e,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let r=Hc.subVectors(i,e).cross(Rd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){let r=t.delta(Hc),a=this.normal.dot(r);if(a===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let s=-(t.start.dot(this.normal)+this.constant)/a;return i===!0&&(s<0||s>1)?null:e.copy(t.start).addScaledVector(r,s)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||Id.getNormalMatrix(t),r=this.coplanarPoint(Hc).applyMatrix4(t),a=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(a),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},hd=0,Wi=class extends ui{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:hd++}),this.uuid=Fn(),this.name="",this.type="Material",this.blending=Bn,this.side=Ci,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Cc,this.blendDst=Jc,this.blendEquation=dn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Gt(0,0,0),this.blendAlpha=0,this.depthFunc=vn,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Cu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xa,this.stencilZFail=xa,this.stencilZPass=xa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){zt(`Material: parameter '${e}' has value of undefined.`);continue}let r=this[e];if(r===void 0){zt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(i.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(i.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(i.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(i.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(a=>a.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(a){let s=[];for(let c in a){let u=a[c];delete u.metadata,s.push(u)}return s}if(e){let a=r(t.textures),s=r(t.images);a.length>0&&(i.textures=a),s.length>0&&(i.images=s)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Gt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new ei().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new qt().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new qt().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let r=e.length;i=new Array(r);for(let a=0;a!==r;++a)i[a]=e[a].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Hi=new X,Pc=new X,la=new X,da=new X,Ma=class{constructor(t=new X,e=new X(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Hi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Hi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Hi.copy(this.origin).addScaledVector(this.direction,e),Hi.distanceToSquared(t))}distanceSqToSegment(t,e,i,r){Pc.copy(t).add(e).multiplyScalar(.5),la.copy(e).sub(t).normalize(),da.copy(this.origin).sub(Pc);let a=t.distanceTo(e)*.5,s=-this.direction.dot(la),c=da.dot(this.direction),u=-da.dot(la),o=da.lengthSq(),l=Math.abs(1-s*s),p,d,A,h;if(l>0)if(p=s*u-c,d=s*c-u,h=a*l,p>=0)if(d>=-h)if(d<=h){let m=1/l;p*=m,d*=m,A=p*(p+s*d+2*c)+d*(s*p+d+2*u)+o}else d=a,p=Math.max(0,-(s*d+c)),A=-p*p+d*(d+2*u)+o;else d=-a,p=Math.max(0,-(s*d+c)),A=-p*p+d*(d+2*u)+o;else d<=-h?(p=Math.max(0,-(-s*a+c)),d=p>0?-a:Math.min(Math.max(-a,-u),a),A=-p*p+d*(d+2*u)+o):d<=h?(p=0,d=Math.min(Math.max(-a,-u),a),A=d*(d+2*u)+o):(p=Math.max(0,-(s*a+c)),d=p>0?a:Math.min(Math.max(-a,-u),a),A=-p*p+d*(d+2*u)+o);else d=s>0?-a:a,p=Math.max(0,-(s*d+c)),A=-p*p+d*(d+2*u)+o;return i&&i.copy(this.origin).addScaledVector(this.direction,p),r&&r.copy(Pc).addScaledVector(la,d),A}intersectSphere(t,e){if(t.radius<0)return null;Hi.subVectors(t.center,this.origin);let i=Hi.dot(this.direction),r=Hi.dot(Hi)-i*i,a=t.radius*t.radius;if(r>a)return null;let s=Math.sqrt(a-r),c=i-s,u=i+s;return u<0?null:c<0?this.at(u,e):this.at(c,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,r,a,s,c,u,o=1/this.direction.x,l=1/this.direction.y,p=1/this.direction.z,d=this.origin;return o>=0?(i=(t.min.x-d.x)*o,r=(t.max.x-d.x)*o):(i=(t.max.x-d.x)*o,r=(t.min.x-d.x)*o),l>=0?(a=(t.min.y-d.y)*l,s=(t.max.y-d.y)*l):(a=(t.max.y-d.y)*l,s=(t.min.y-d.y)*l),i>s||a>r||((a>i||isNaN(i))&&(i=a),(s<r||isNaN(r))&&(r=s),p>=0?(c=(t.min.z-d.z)*p,u=(t.max.z-d.z)*p):(c=(t.max.z-d.z)*p,u=(t.min.z-d.z)*p),i>u||c>r)||((c>i||i!==i)&&(i=c),(u<r||r!==r)&&(r=u),r<0)?null:this.at(i>=0?i:r,e)}intersectsBox(t){return this.intersectBox(t,Hi)!==null}intersectTriangle(t,e,i,r,a){let s=this.origin,c=this.direction,u=c.x,o=c.y,l=c.z,p=t.x-s.x,d=t.y-s.y,A=t.z-s.z,h=e.x-s.x,m=e.y-s.y,f=e.z-s.z,R=i.x-s.x,O=i.y-s.y,H=i.z-s.z,b=Math.abs(u),x=Math.abs(o),P=Math.abs(l),I,y,L,j,N,z,G,W,Z,B,E,et;if(b>=x&&b>=P?(L=u,z=p,Z=h,et=R,u>=0?(I=o,y=l,j=d,N=A,G=m,W=f,B=O,E=H):(I=l,y=o,j=A,N=d,G=f,W=m,B=H,E=O)):x>=P?(L=o,z=d,Z=m,et=O,o>=0?(I=l,y=u,j=A,N=p,G=f,W=h,B=H,E=R):(I=u,y=l,j=p,N=A,G=h,W=f,B=R,E=H)):(L=l,z=A,Z=f,et=H,l>=0?(I=u,y=o,j=p,N=d,G=h,W=m,B=R,E=O):(I=o,y=u,j=d,N=p,G=m,W=h,B=O,E=R)),L===0)return null;let D=I/L,J=y/L,_=1/L,Vt=j-D*z,Wt=N-J*z,F=G-D*Z,ht=W-J*Z,St=B-D*et,vt=E-J*et,pt=St*ht-vt*F,Nt=Vt*vt-Wt*St,oe=F*Wt-ht*Vt;if(r){if(pt<0||Nt<0||oe<0)return null}else if((pt<0||Nt<0||oe<0)&&(pt>0||Nt>0||oe>0))return null;let Xt=pt+Nt+oe;if(Xt===0)return null;let Zt=_*(pt*z+Nt*Z+oe*et);return(Xt>0?Zt<0:Zt>0)?null:this.at(Zt/Xt,a)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},cn=class extends Wi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new di,this.combine=ds,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},iu=new ce,en=new Ma,Aa=new Zi,nu=new X,pa=new X,fa=new X,Ra=new X,xc=new X,Ia=new X,ru=new X,ha=new X,he=class extends We{constructor(t=new ni,e=new cn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,s=r.length;a<s;a++){let c=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=a}}}}getVertexPosition(t,e){let i=this.geometry,r=i.attributes.position,a=i.morphAttributes.position,s=i.morphTargetsRelative;e.fromBufferAttribute(r,t);let c=this.morphTargetInfluences;if(a&&c){Ia.set(0,0,0);for(let u=0,o=a.length;u<o;u++){let l=c[u],p=a[u];l!==0&&(xc.fromBufferAttribute(p,t),s?Ia.addScaledVector(xc,l):Ia.addScaledVector(xc.sub(e),l))}e.add(Ia)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Aa.copy(i.boundingSphere),Aa.applyMatrix4(a),en.copy(t.ray).recast(t.near),!(Aa.containsPoint(en.origin)===!1&&(en.intersectSphere(Aa,nu)===null||en.origin.distanceToSquared(nu)>(t.far-t.near)**2))&&(iu.copy(a).invert(),en.copy(t.ray).applyMatrix4(iu),!(i.boundingBox!==null&&en.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,en)))}_computeIntersections(t,e,i){let r,a=this.geometry,s=this.material,c=a.index,u=a.attributes.position,o=a.attributes.uv,l=a.attributes.uv1,p=a.attributes.normal,d=a.groups,A=a.drawRange;if(c!==null)if(Array.isArray(s))for(let h=0,m=d.length;h<m;h++){let f=d[h],R=s[f.materialIndex],O=Math.max(f.start,A.start),H=Math.min(c.count,Math.min(f.start+f.count,A.start+A.count));for(let b=O,x=H;b<x;b+=3){let P=c.getX(b),I=c.getX(b+1),y=c.getX(b+2);r=qa(this,R,t,i,o,l,p,P,I,y),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=f.materialIndex,e.push(r))}}else{let h=Math.max(0,A.start),m=Math.min(c.count,A.start+A.count);for(let f=h,R=m;f<R;f+=3){let O=c.getX(f),H=c.getX(f+1),b=c.getX(f+2);r=qa(this,s,t,i,o,l,p,O,H,b),r&&(r.faceIndex=Math.floor(f/3),e.push(r))}}else if(u!==void 0)if(Array.isArray(s))for(let h=0,m=d.length;h<m;h++){let f=d[h],R=s[f.materialIndex],O=Math.max(f.start,A.start),H=Math.min(u.count,Math.min(f.start+f.count,A.start+A.count));for(let b=O,x=H;b<x;b+=3){let P=b,I=b+1,y=b+2;r=qa(this,R,t,i,o,l,p,P,I,y),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=f.materialIndex,e.push(r))}}else{let h=Math.max(0,A.start),m=Math.min(u.count,A.start+A.count);for(let f=h,R=m;f<R;f+=3){let O=f,H=f+1,b=f+2;r=qa(this,s,t,i,o,l,p,O,H,b),r&&(r.faceIndex=Math.floor(f/3),e.push(r))}}}};function qd(n,t,e,i,r,a,s,c){let u;if(t.side===je?u=i.intersectTriangle(s,a,r,!0,c):u=i.intersectTriangle(r,a,s,t.side===Ci,c),u===null)return null;ha.copy(c),ha.applyMatrix4(n.matrixWorld);let o=e.ray.origin.distanceTo(ha);return o<e.near||o>e.far?null:{distance:o,point:ha.clone(),object:n}}function qa(n,t,e,i,r,a,s,c,u,o){n.getVertexPosition(c,pa),n.getVertexPosition(u,fa),n.getVertexPosition(o,Ra);let l=qd(n,t,e,i,pa,fa,Ra,ru);if(l){let p=new X;Di.getBarycoord(ru,pa,fa,Ra,p),r&&(l.uv=Di.getInterpolatedAttribute(r,c,u,o,p,new qt)),a&&(l.uv1=Di.getInterpolatedAttribute(a,c,u,o,p,new qt)),s&&(l.normal=Di.getInterpolatedAttribute(s,c,u,o,p,new X),l.normal.dot(i.direction)>0&&l.normal.multiplyScalar(-1));let d={a:c,b:u,c:o,normal:new X,materialIndex:0};Di.getNormal(pa,fa,Ra,d.normal),l.face=d,l.barycoord=p}return l}var Rr=class extends ze{constructor(t=null,e=1,i=1,r,a,s,c,u,o=xe,l=xe,p,d){super(null,s,c,u,o,l,r,a,p,d),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ir=class extends ii{constructor(t,e,i,r=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Hn=new ce,au=new ce,Va=[],su=new Ai,Vd=new ce,nr=new he,rr=new Zi,hr=class extends he{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Ir(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,Vd)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Ai),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Hn),su.copy(t.boundingBox).applyMatrix4(Hn),this.boundingBox.union(su)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Zi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Hn),rr.copy(t.boundingSphere).applyMatrix4(Hn),this.boundingSphere.union(rr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),this.morphTexture=t.morphTexture!==null?t.morphTexture.clone():null,this.instanceColor=t.instanceColor!==null?t.instanceColor.clone():null,this.count=t.count,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let i=e.morphTargetInfluences,r=this.morphTexture.source.data.data,a=i.length+1,s=t*a+1;for(let c=0;c<i.length;c++)i[c]=r[s+c]}raycast(t,e){let i=this.matrixWorld,r=this.count;if(nr.geometry=this.geometry,nr.material=this.material,nr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),rr.copy(this.boundingSphere),rr.applyMatrix4(i),t.ray.intersectsSphere(rr)!==!1))for(let a=0;a<r;a++){this.getMatrixAt(a,Hn),au.multiplyMatrices(i,Hn),nr.matrixWorld=au,nr.raycast(t,Va);for(let s=0,c=Va.length;s<c;s++){let u=Va[s];u.instanceId=a,u.object=this,e.push(u)}Va.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Ir(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let i=e.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new Rr(new Float32Array(r*this.count),r,this.count,qs,Je));let a=this.morphTexture.source.data.data,s=0;for(let o=0;o<i.length;o++)s+=i[o];let c=this.geometry.morphTargetsRelative?1:1-s,u=r*t;return a[u]=c,a.set(i,u+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},nn=new Zi,md=new qt(.5,.5),ma=new X,Mi=class{constructor(t=new ei,e=new ei,i=new ei,r=new ei,a=new ei,s=new ei){this.planes=[t,e,i,r,a,s]}set(t,e,i,r,a,s){let c=this.planes;return c[0].copy(t),c[1].copy(e),c[2].copy(i),c[3].copy(r),c[4].copy(a),c[5].copy(s),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Ce,i=!1){let r=this.planes,a=t.elements,s=a[0],c=a[1],u=a[2],o=a[3],l=a[4],p=a[5],d=a[6],A=a[7],h=a[8],m=a[9],f=a[10],R=a[11],O=a[12],H=a[13],b=a[14],x=a[15];if(r[0].setComponents(o-s,A-l,R-h,x-O).normalize(),r[1].setComponents(o+s,A+l,R+h,x+O).normalize(),r[2].setComponents(o+c,A+p,R+m,x+H).normalize(),r[3].setComponents(o-c,A-p,R-m,x-H).normalize(),i)r[4].setComponents(u,d,f,b).normalize(),r[5].setComponents(o-u,A-d,R-f,x-b).normalize();else if(r[4].setComponents(o-u,A-d,R-f,x-b).normalize(),e===Ce)r[5].setComponents(o+u,A+d,R+f,x+b).normalize();else if(e===Tn)r[5].setComponents(u,d,f,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),nn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),nn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(nn)}intersectsSprite(t){nn.center.set(0,0,0);let e=md.distanceTo(t.center);return nn.radius=.7071067811865476+e,nn.applyMatrix4(t.matrixWorld),this.intersectsSphere(nn)}intersectsSphere(t){let e=this.planes,i=t.center,r=-t.radius;for(let a=0;a<6;a++)if(e[a].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let r=e[i];if(ma.x=r.normal.x>0?t.max.x:t.min.x,ma.y=r.normal.y>0?t.max.y:t.min.y,ma.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(ma)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},cu=new ce,Ba=class n{constructor(){this.coordinateSystem=Ce,this._frustums=[],this._count=0}setFromArrayCamera(t){let e=t.cameras,i=this._frustums;for(let r=0;r<e.length;r++){let a=e[r];cu.multiplyMatrices(a.projectionMatrix,a.matrixWorldInverse),i[r]===void 0&&(i[r]=new Mi),i[r].setFromProjectionMatrix(cu,a.coordinateSystem,a.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsObject(t))return!0;return!1}intersectsSprite(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsSphere(t))return!0;return!1}intersectsBox(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsBox(t))return!0;return!1}containsPoint(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let e=this._frustums,i=t._frustums;for(let r=0;r<t._count;r++)e[r]===void 0&&(e[r]=new Mi),e[r].copy(i[r]);return this._count=t._count,this}clone(){return new n().copy(this)}};var qr=class extends ze{constructor(t=[],e=An,i,r,a,s,c,u,o,l){super(t,e,i,r,a,s,c,u,o,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Vr=class extends ze{constructor(t,e,i,r,a,s,c,u,o){super(t,e,i,r,a,s,c,u,o),this.isCanvasTexture=!0,this.needsUpdate=!0}};var ji=class extends ze{constructor(t,e,i=ri,r,a,s,c=xe,u=xe,o,l=gi,p=1){if(l!==gi&&l!==Ti)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:t,height:e,depth:p};super(d,r,a,s,c,u,l,i,o),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ln(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},mr=class extends ji{constructor(t,e=ri,i=An,r,a,s=xe,c=xe,u,o=gi){let l={width:t,height:t,depth:1},p=[l,l,l,l,l,l];super(t,t,e,i,r,a,s,c,u,o),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},br=class extends ze{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},pi=class n extends ni{constructor(t=1,e=1,i=1,r=1,a=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:r,heightSegments:a,depthSegments:s};let c=this;r=Math.floor(r),a=Math.floor(a),s=Math.floor(s);let u=[],o=[],l=[],p=[],d=0,A=0;h("z","y","x",-1,-1,i,e,t,s,a,0),h("z","y","x",1,-1,i,e,-t,s,a,1),h("x","z","y",1,1,t,i,e,r,s,2),h("x","z","y",1,-1,t,i,-e,r,s,3),h("x","y","z",1,-1,t,e,i,r,a,4),h("x","y","z",-1,-1,t,e,-i,r,a,5),this.setIndex(u),this.setAttribute("position",new be(o,3)),this.setAttribute("normal",new be(l,3)),this.setAttribute("uv",new be(p,2));function h(m,f,R,O,H,b,x,P,I,y,L){let j=b/I,N=x/y,z=b/2,G=x/2,W=P/2,Z=I+1,B=y+1,E=0,et=0,D=new X;for(let J=0;J<B;J++){let _=J*N-G;for(let Vt=0;Vt<Z;Vt++){let Wt=Vt*j-z;D[m]=Wt*O,D[f]=_*H,D[R]=W,o.push(D.x,D.y,D.z),D[m]=0,D[f]=0,D[R]=P>0?1:-1,l.push(D.x,D.y,D.z),p.push(Vt/I),p.push(1-J/y),E+=1}}for(let J=0;J<y;J++)for(let _=0;_<I;_++){let Vt=d+_+Z*J,Wt=d+_+Z*(J+1),F=d+(_+1)+Z*(J+1),ht=d+(_+1)+Z*J;u.push(Vt,Wt,ht),u.push(Wt,F,ht),et+=6}c.addGroup(A,et,L),A+=et,d+=E}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var yr=class n extends ni{constructor(t=1,e=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:r},e=Math.max(3,e);let a=[],s=[],c=[],u=[],o=new X,l=new qt;s.push(0,0,0),c.push(0,0,1),u.push(.5,.5);for(let p=0,d=3;p<=e;p++,d+=3){let A=i+p/e*r;o.x=t*Math.cos(A),o.y=t*Math.sin(A),s.push(o.x,o.y,o.z),c.push(0,0,1),l.x=(s[d]/t+1)/2,l.y=(s[d+1]/t+1)/2,u.push(l.x,l.y)}for(let p=1;p<=e;p++)a.push(p,p+1,0);this.setIndex(a),this.setAttribute("position",new be(s,3)),this.setAttribute("normal",new be(c,3)),this.setAttribute("uv",new be(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Or=class n extends ni{constructor(t=1,e=1,i=1,r=32,a=1,s=!1,c=0,u=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:r,heightSegments:a,openEnded:s,thetaStart:c,thetaLength:u};let o=this;r=Math.floor(r),a=Math.floor(a);let l=[],p=[],d=[],A=[],h=0,m=[],f=i/2,R=0;O(),s===!1&&(t>0&&H(!0),e>0&&H(!1)),this.setIndex(l),this.setAttribute("position",new be(p,3)),this.setAttribute("normal",new be(d,3)),this.setAttribute("uv",new be(A,2));function O(){let b=new X,x=new X,P=0,I=(e-t)/i;for(let y=0;y<=a;y++){let L=[],j=y/a,N=j*(e-t)+t;for(let z=0;z<=r;z++){let G=z/r,W=G*u+c,Z=Math.sin(W),B=Math.cos(W);x.x=N*Z,x.y=-j*i+f,x.z=N*B,p.push(x.x,x.y,x.z),b.set(Z,I,B).normalize(),d.push(b.x,b.y,b.z),A.push(G,1-j),L.push(h++)}m.push(L)}for(let y=0;y<r;y++)for(let L=0;L<a;L++){let j=m[L][y],N=m[L+1][y],z=m[L+1][y+1],G=m[L][y+1];(t>0||L!==0)&&(l.push(j,N,G),P+=3),(e>0||L!==a-1)&&(l.push(N,z,G),P+=3)}o.addGroup(R,P,0),R+=P}function H(b){let x=h,P=new qt,I=new X,y=0,L=b===!0?t:e,j=b===!0?1:-1;for(let z=1;z<=r;z++)p.push(0,f*j,0),d.push(0,j,0),A.push(.5,.5),h++;let N=h;for(let z=0;z<=r;z++){let W=z/r*u+c,Z=Math.cos(W),B=Math.sin(W);I.x=L*B,I.y=f*j,I.z=L*Z,p.push(I.x,I.y,I.z),d.push(0,j,0),P.x=Z*.5+.5,P.y=B*.5*j+.5,A.push(P.x,P.y),h++}for(let z=0;z<r;z++){let G=x+z,W=N+z;b===!0?l.push(W,W+1,G):l.push(W+1,W,G),y+=3}o.addGroup(R,y,b===!0?1:2),R+=y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var Ge=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){zt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,r=this.getPoint(0),a=0;e.push(0);for(let s=1;s<=t;s++)i=this.getPoint(s/t),a+=i.distanceTo(r),e.push(a),r=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let i=this.getLengths(),r=0,a=i.length,s;e?s=e:s=t*i[a-1];let c=0,u=a-1,o;for(;c<=u;)if(r=Math.floor(c+(u-c)/2),o=i[r]-s,o<0)c=r+1;else if(o>0)u=r-1;else{u=r;break}if(r=u,i[r]===s)return r/(a-1);let l=i[r],d=i[r+1]-l,A=(s-l)/d;return(r+A)/(a-1)}getTangent(t,e){let r=t-1e-4,a=t+1e-4;r<0&&(r=0),a>1&&(a=1);let s=this.getPoint(r),c=this.getPoint(a),u=e||(s.isVector2?new qt:new X);return u.copy(c).sub(s).normalize(),u}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){let i=new X,r=[],a=[],s=[],c=new X,u=new ce;for(let A=0;A<=t;A++){let h=A/t;r[A]=this.getTangentAt(h,new X)}a[0]=new X,s[0]=new X;let o=Number.MAX_VALUE,l=Math.abs(r[0].x),p=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=o&&(o=l,i.set(1,0,0)),p<=o&&(o=p,i.set(0,1,0)),d<=o&&i.set(0,0,1),c.crossVectors(r[0],i).normalize(),a[0].crossVectors(r[0],c),s[0].crossVectors(r[0],a[0]);for(let A=1;A<=t;A++){if(a[A]=a[A-1].clone(),s[A]=s[A-1].clone(),c.crossVectors(r[A-1],r[A]),c.length()>Number.EPSILON){c.normalize();let h=Math.acos(Yt(r[A-1].dot(r[A]),-1,1));a[A].applyMatrix4(u.makeRotationAxis(c,h))}s[A].crossVectors(r[A],a[A])}if(e===!0){let A=Math.acos(Yt(a[0].dot(a[t]),-1,1));A/=t,r[0].dot(c.crossVectors(a[0],a[t]))>0&&(A=-A);for(let h=1;h<=t;h++)a[h].applyMatrix4(u.makeRotationAxis(r[h],A*h)),s[h].crossVectors(r[h],a[h])}return{tangents:r,normals:a,binormals:s}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}},zn=class extends Ge{constructor(t=0,e=0,i=1,r=1,a=0,s=Math.PI*2,c=!1,u=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=r,this.aStartAngle=a,this.aEndAngle=s,this.aClockwise=c,this.aRotation=u}getPoint(t,e=new qt){let i=e,r=Math.PI*2,a=this.aEndAngle-this.aStartAngle,s=Math.abs(a)<Number.EPSILON;for(;a<0;)a+=r;for(;a>r;)a-=r;a<Number.EPSILON&&(s?a=0:a=r),this.aClockwise===!0&&!s&&(a===r?a=-r:a=a-r);let c=this.aStartAngle+t*a,u=this.aX+this.xRadius*Math.cos(c),o=this.aY+this.yRadius*Math.sin(c);if(this.aRotation!==0){let l=Math.cos(this.aRotation),p=Math.sin(this.aRotation),d=u-this.aX,A=o-this.aY;u=d*l-A*p+this.aX,o=d*p+A*l+this.aY}return i.set(u,o)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Ga=class extends zn{constructor(t,e,i,r,a,s){super(t,e,i,i,r,a,s),this.isArcCurve=!0,this.type="ArcCurve"}};function ho(){let n=0,t=0,e=0,i=0;function r(a,s,c,u){n=a,t=c,e=-3*a+3*s-2*c-u,i=2*a-2*s+c+u}return{initCatmullRom:function(a,s,c,u,o){r(s,c,o*(c-a),o*(u-s))},initNonuniformCatmullRom:function(a,s,c,u,o,l,p){let d=(s-a)/o-(c-a)/(o+l)+(c-s)/l,A=(c-s)/l-(u-s)/(l+p)+(u-c)/p;d*=l,A*=l,r(s,c,d,A)},calc:function(a){let s=a*a,c=s*a;return n+t*a+e*s+i*c}}}var ou=new X,uu=new X,gc=new ho,Wc=new ho,jc=new ho,Ka=class extends Ge{constructor(t=[],e=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=r}getPoint(t,e=new X){let i=e,r=this.points,a=r.length,s=(a-(this.closed?0:1))*t,c=Math.floor(s),u=s-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/a)+1)*a:u===0&&c===a-1&&(c=a-2,u=1);let o,l;this.closed||c>0?o=r[(c-1)%a]:(uu.subVectors(r[0],r[1]).add(r[0]),o=uu);let p=r[c%a],d=r[(c+1)%a];if(this.closed||c+2<a?l=r[(c+2)%a]:(ou.subVectors(r[a-1],r[a-2]).add(r[a-1]),l=ou),this.curveType==="centripetal"||this.curveType==="chordal"){let A=this.curveType==="chordal"?.5:.25,h=Math.pow(o.distanceToSquared(p),A),m=Math.pow(p.distanceToSquared(d),A),f=Math.pow(d.distanceToSquared(l),A);m<1e-4&&(m=1),h<1e-4&&(h=m),f<1e-4&&(f=m),gc.initNonuniformCatmullRom(o.x,p.x,d.x,l.x,h,m,f),Wc.initNonuniformCatmullRom(o.y,p.y,d.y,l.y,h,m,f),jc.initNonuniformCatmullRom(o.z,p.z,d.z,l.z,h,m,f)}else this.curveType==="catmullrom"&&(gc.initCatmullRom(o.x,p.x,d.x,l.x,this.tension),Wc.initCatmullRom(o.y,p.y,d.y,l.y,this.tension),jc.initCatmullRom(o.z,p.z,d.z,l.z,this.tension));return i.set(gc.calc(u),Wc.calc(u),jc.calc(u)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let r=t.points[e];this.points.push(r.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let r=this.points[e];t.points.push(r.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let r=t.points[e];this.points.push(new X().fromArray(r))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function lu(n,t,e,i,r){let a=(i-t)*.5,s=(r-e)*.5,c=n*n,u=n*c;return(2*e-2*i+a+s)*u+(-3*e+3*i-2*a-s)*c+a*n+e}function bd(n,t){let e=1-n;return e*e*t}function yd(n,t){return 2*(1-n)*n*t}function Od(n,t){return n*n*t}function sr(n,t,e,i){return bd(n,t)+yd(n,e)+Od(n,i)}function Sd(n,t){let e=1-n;return e*e*e*t}function Hd(n,t){let e=1-n;return 3*e*e*n*t}function Pd(n,t){return 3*(1-n)*n*n*t}function xd(n,t){return n*n*n*t}function cr(n,t,e,i,r){return Sd(n,t)+Hd(n,e)+Pd(n,i)+xd(n,r)}var Sr=class extends Ge{constructor(t=new qt,e=new qt,i=new qt,r=new qt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=r}getPoint(t,e=new qt){let i=e,r=this.v0,a=this.v1,s=this.v2,c=this.v3;return i.set(cr(t,r.x,a.x,s.x,c.x),cr(t,r.y,a.y,s.y,c.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Fa=class extends Ge{constructor(t=new X,e=new X,i=new X,r=new X){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=r}getPoint(t,e=new X){let i=e,r=this.v0,a=this.v1,s=this.v2,c=this.v3;return i.set(cr(t,r.x,a.x,s.x,c.x),cr(t,r.y,a.y,s.y,c.y),cr(t,r.z,a.z,s.z,c.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Hr=class extends Ge{constructor(t=new qt,e=new qt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new qt){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new qt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ca=class extends Ge{constructor(t=new X,e=new X){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new X){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new X){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Pr=class extends Ge{constructor(t=new qt,e=new qt,i=new qt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new qt){let i=e,r=this.v0,a=this.v1,s=this.v2;return i.set(sr(t,r.x,a.x,s.x),sr(t,r.y,a.y,s.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ja=class extends Ge{constructor(t=new X,e=new X,i=new X){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new X){let i=e,r=this.v0,a=this.v1,s=this.v2;return i.set(sr(t,r.x,a.x,s.x),sr(t,r.y,a.y,s.y),sr(t,r.z,a.z,s.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},xr=class extends Ge{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new qt){let i=e,r=this.points,a=(r.length-1)*t,s=Math.floor(a),c=a-s,u=r[s===0?s:s-1],o=r[s],l=r[s>r.length-2?r.length-1:s+1],p=r[s>r.length-3?r.length-1:s+2];return i.set(lu(c,u.x,o.x,l.x,p.x),lu(c,u.y,o.y,l.y,p.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let r=t.points[e];this.points.push(r.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let r=this.points[e];t.points.push(r.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let r=t.points[e];this.points.push(new qt().fromArray(r))}return this}},Ec=Object.freeze({__proto__:null,ArcCurve:Ga,CatmullRomCurve3:Ka,CubicBezierCurve:Sr,CubicBezierCurve3:Fa,EllipseCurve:zn,LineCurve:Hr,LineCurve3:Ca,QuadraticBezierCurve:Pr,QuadraticBezierCurve3:Ja,SplineCurve:xr}),Qa=class extends Ge{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ec[i](e,t))}return this}getPoint(t,e){let i=t*this.getLength(),r=this.getCurveLengths(),a=0;for(;a<r.length;){if(r[a]>=i){let s=r[a]-i,c=this.curves[a],u=c.getLength(),o=u===0?0:1-s/u;return c.getPointAt(o,e)}a++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let i=0,r=this.curves.length;i<r;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],i;for(let r=0,a=this.curves;r<a.length;r++){let s=a[r],c=s.isEllipseCurve?t*2:s.isLineCurve||s.isLineCurve3?1:s.isSplineCurve?t*s.points.length:t,u=s.getPoints(c);for(let o=0;o<u.length;o++){let l=u[o];i&&i.equals(l)||(e.push(l),i=l)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let r=t.curves[e];this.curves.push(r.clone())}return this.autoClose=t.autoClose,this.cacheLengths=null,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){let r=this.curves[e];t.curves.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let r=t.curves[e];this.curves.push(new Ec[r.type]().fromJSON(r))}return this.cacheLengths=null,this}},on=class extends Qa{constructor(t){super(),this.type="Path",this.currentPoint=new qt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let i=new Hr(this.currentPoint.clone(),new qt(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,r){let a=new Pr(this.currentPoint.clone(),new qt(t,e),new qt(i,r));return this.curves.push(a),this.currentPoint.set(i,r),this}bezierCurveTo(t,e,i,r,a,s){let c=new Sr(this.currentPoint.clone(),new qt(t,e),new qt(i,r),new qt(a,s));return this.curves.push(c),this.currentPoint.set(a,s),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),i=new xr(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,r,a,s){let c=this.currentPoint.x,u=this.currentPoint.y;return this.absarc(t+c,e+u,i,r,a,s),this}absarc(t,e,i,r,a,s){return this.absellipse(t,e,i,i,r,a,s),this}ellipse(t,e,i,r,a,s,c,u){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(t+o,e+l,i,r,a,s,c,u),this}absellipse(t,e,i,r,a,s,c,u){let o=new zn(t,e,i,r,a,s,c,u);if(this.curves.length>0){let p=o.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(o);let l=o.getPoint(1);return this.currentPoint.copy(l),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},kn=class extends on{constructor(t){super(t),this.uuid=Fn(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let i=0,r=this.holes.length;i<r;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let r=t.holes[e];this.holes.push(r.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){let r=this.holes[e];t.holes.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let r=t.holes[e];this.holes.push(new on().fromJSON(r))}return this}};function gd(n,t,e=2){let i=t&&t.length,r=i?t[0]*e:n.length,a=cl(n,0,r,e,!0),s=[];if(!a||a.next===a.prev)return s;let c,u,o;if(i&&(a=Nd(n,t,a,e)),n.length>80*e){c=n[0],u=n[1];let l=c,p=u;for(let d=e;d<r;d+=e){let A=n[d],h=n[d+1];A<c&&(c=A),h<u&&(u=h),A>l&&(l=A),h>p&&(p=h)}o=Math.max(l-c,p-u),o=o!==0?32767/o:0}return gr(a,s,e,c,u,o,0),s}function cl(n,t,e,i,r){let a;if(r===Bd(n,t,e,i)>0)for(let s=t;s<e;s+=i)a=du(s/i|0,n[s],n[s+1],a);else for(let s=e-i;s>=t;s-=i)a=du(s/i|0,n[s],n[s+1],a);return a&&wn(a,a.next)&&(jr(a),a=a.next),a}function un(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(wn(e,e.next)||Re(e.prev,e,e.next)===0)){if(jr(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function gr(n,t,e,i,r,a,s){if(!n)return;!s&&a&&kd(n,i,r,a);let c=n;for(;n.prev!==n.next;){let u=n.prev,o=n.next;if(a?jd(n,i,r,a):Wd(n)){t.push(u.i,n.i,o.i),jr(n),n=o.next,c=o.next;continue}if(n=o,n===c){s?s===1?(n=vd(un(n),t),gr(n,t,e,i,r,a,2)):s===2&&Td(n,t,e,i,r,a):gr(un(n),t,e,i,r,a,1);break}}}function Wd(n){let t=n.prev,e=n,i=n.next;if(Re(t,e,i)>=0)return!1;let r=t.x,a=e.x,s=i.x,c=t.y,u=e.y,o=i.y,l=Math.min(r,a,s),p=Math.min(c,u,o),d=Math.max(r,a,s),A=Math.max(c,u,o),h=i.next;for(;h!==t;){if(h.x>=l&&h.x<=d&&h.y>=p&&h.y<=A&&ar(r,c,a,u,s,o,h.x,h.y)&&Re(h.prev,h,h.next)>=0)return!1;h=h.next}return!0}function jd(n,t,e,i){let r=n.prev,a=n,s=n.next;if(Re(r,a,s)>=0)return!1;let c=r.x,u=a.x,o=s.x,l=r.y,p=a.y,d=s.y,A=Math.min(c,u,o),h=Math.min(l,p,d),m=Math.max(c,u,o),f=Math.max(l,p,d),R=zc(A,h,t,e,i),O=zc(m,f,t,e,i),H=n.prevZ,b=n.nextZ;for(;H&&H.z>=R&&b&&b.z<=O;){if(H.x>=A&&H.x<=m&&H.y>=h&&H.y<=f&&H!==r&&H!==s&&ar(c,l,u,p,o,d,H.x,H.y)&&Re(H.prev,H,H.next)>=0||(H=H.prevZ,b.x>=A&&b.x<=m&&b.y>=h&&b.y<=f&&b!==r&&b!==s&&ar(c,l,u,p,o,d,b.x,b.y)&&Re(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;H&&H.z>=R;){if(H.x>=A&&H.x<=m&&H.y>=h&&H.y<=f&&H!==r&&H!==s&&ar(c,l,u,p,o,d,H.x,H.y)&&Re(H.prev,H,H.next)>=0)return!1;H=H.prevZ}for(;b&&b.z<=O;){if(b.x>=A&&b.x<=m&&b.y>=h&&b.y<=f&&b!==r&&b!==s&&ar(c,l,u,p,o,d,b.x,b.y)&&Re(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function vd(n,t){let e=n;do{let i=e.prev,r=e.next.next;!wn(i,r)&&ul(i,e,e.next,r)&&Wr(i,r)&&Wr(r,i)&&(t.push(i.i,e.i,r.i),jr(e),jr(e.next),e=n=r),e=e.next}while(e!==n);return un(e)}function Td(n,t,e,i,r,a){let s=n;do{let c=s.next.next;for(;c!==s.prev;){if(s.i!==c.i&&Dd(s,c)){let u=ll(s,c);s=un(s,s.next),u=un(u,u.next),gr(s,t,e,i,r,a,0),gr(u,t,e,i,r,a,0);return}c=c.next}s=s.next}while(s!==n)}function Nd(n,t,e,i){let r=[];for(let a=0,s=t.length;a<s;a++){let c=t[a]*i,u=a<s-1?t[a+1]*i:n.length,o=cl(n,c,u,i,!1);o===o.next&&(o.steiner=!0),r.push(Ud(o))}r.sort(Xd);for(let a=0;a<r.length;a++)e=Ld(r[a],e);return e}function Xd(n,t){let e=n.x-t.x;if(e===0&&(e=n.y-t.y,e===0)){let i=(n.next.y-n.y)/(n.next.x-n.x),r=(t.next.y-t.y)/(t.next.x-t.x);e=i-r}return e}function Ld(n,t){let e=Ed(n,t);if(!e)return t;let i=ll(e,n);return un(i,i.next),un(e,e.next)}function Ed(n,t){let e=t,i=n.x,r=n.y,a=-1/0,s;if(wn(n,e))return e;do{if(wn(n,e.next))return e.next;if(r<=e.y&&r>=e.next.y&&e.next.y!==e.y){let p=e.x+(r-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(p<=i&&p>a&&(a=p,s=e.x<e.next.x?e:e.next,p===i))return s}e=e.next}while(e!==t);if(!s)return null;let c=s,u=s.x,o=s.y,l=1/0;e=s;do{if(i>=e.x&&e.x>=u&&i!==e.x&&ol(r<o?i:a,r,u,o,r<o?a:i,r,e.x,e.y)){let p=Math.abs(r-e.y)/(i-e.x);Wr(e,n)&&(p<l||p===l&&(e.x>s.x||e.x===s.x&&zd(s,e)))&&(s=e,l=p)}e=e.next}while(e!==c);return s}function zd(n,t){return Re(n.prev,n,t.prev)<0&&Re(t.next,n,n.next)<0}function kd(n,t,e,i){let r=n;do r.z===0&&(r.z=zc(r.x,r.y,t,e,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,wd(r)}function wd(n){let t,e=1;do{let i=n,r;n=null;let a=null;for(t=0;i;){t++;let s=i,c=0;for(let o=0;o<e&&(c++,s=s.nextZ,!!s);o++);let u=e;for(;c>0||u>0&&s;)c!==0&&(u===0||!s||i.z<=s.z)?(r=i,i=i.nextZ,c--):(r=s,s=s.nextZ,u--),a?a.nextZ=r:n=r,r.prevZ=a,a=r;i=s}a.nextZ=null,e*=2}while(t>1);return n}function zc(n,t,e,i,r){return n=(n-e)*r|0,t=(t-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function Ud(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function ol(n,t,e,i,r,a,s,c){return(r-s)*(t-c)>=(n-s)*(a-c)&&(n-s)*(i-c)>=(e-s)*(t-c)&&(e-s)*(a-c)>=(r-s)*(i-c)}function ar(n,t,e,i,r,a,s,c){return!(n===s&&t===c)&&ol(n,t,e,i,r,a,s,c)}function Dd(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!Zd(n,t)&&(Wr(n,t)&&Wr(t,n)&&Md(n,t)&&(Re(n.prev,n,t.prev)||Re(n,t.prev,t))||wn(n,t)&&Re(n.prev,n,n.next)>0&&Re(t.prev,t,t.next)>0)}function Re(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function wn(n,t){return n.x===t.x&&n.y===t.y}function ul(n,t,e,i){let r=ya(Re(n,t,e)),a=ya(Re(n,t,i)),s=ya(Re(e,i,n)),c=ya(Re(e,i,t));return!!(r!==a&&s!==c||r===0&&ba(n,e,t)||a===0&&ba(n,i,t)||s===0&&ba(e,n,i)||c===0&&ba(e,t,i))}function ba(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function ya(n){return n>0?1:n<0?-1:0}function Zd(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&ul(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function Wr(n,t){return Re(n.prev,n,n.next)<0?Re(n,t,n.next)>=0&&Re(n,n.prev,t)>=0:Re(n,t,n.prev)<0||Re(n,n.next,t)<0}function Md(n,t){let e=n,i=!1,r=(n.x+t.x)/2,a=(n.y+t.y)/2;do e.y>a!=e.next.y>a&&e.next.y!==e.y&&r<(e.next.x-e.x)*(a-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function ll(n,t){let e=kc(n.i,n.x,n.y),i=kc(t.i,t.x,t.y),r=n.next,a=t.prev;return n.next=t,t.prev=n,e.next=r,r.prev=e,i.next=e,e.prev=i,a.next=i,i.prev=a,i}function du(n,t,e,i){let r=kc(n,t,e);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function jr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function kc(n,t,e){return{i:n,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Bd(n,t,e,i){let r=0;for(let a=t,s=e-i;a<e;a+=i)r+=(n[s]-n[a])*(n[a+1]+n[s+1]),s=a;return r}var wc=class{static triangulate(t,e,i=2){return gd(t,e,i)}},rn=class n{static area(t){let e=t.length,i=0;for(let r=e-1,a=0;a<e;r=a++)i+=t[r].x*t[a].y-t[a].x*t[r].y;return i*.5}static isClockWise(t){return n.area(t)<0}static triangulateShape(t,e){let i=[],r=[],a=[];Au(t),pu(i,t);let s=t.length;e.forEach(Au);for(let u=0;u<e.length;u++)r.push(s),s+=e[u].length,pu(i,e[u]);let c=wc.triangulate(i,r);for(let u=0;u<c.length;u+=3)a.push(c.slice(u,u+3));return a}};function Au(n){let t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function pu(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}var vr=class n extends ni{constructor(t=new kn([new qt(.5,.5),new qt(-.5,.5),new qt(-.5,-.5),new qt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let i=this,r=[],a=[];for(let c=0,u=t.length;c<u;c++){let o=t[c];s(o)}this.setAttribute("position",new be(r,3)),this.setAttribute("uv",new be(a,2)),this.computeVertexNormals();function s(c){let u=[],o=e.curveSegments!==void 0?e.curveSegments:12,l=e.steps!==void 0?e.steps:1,p=e.depth!==void 0?e.depth:1,d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,A=e.bevelThickness!==void 0?e.bevelThickness:.2,h=e.bevelSize!==void 0?e.bevelSize:A-.1,m=e.bevelOffset!==void 0?e.bevelOffset:0,f=e.bevelSegments!==void 0?e.bevelSegments:3,R=e.extrudePath,O=e.UVGenerator!==void 0?e.UVGenerator:Gd,H,b=!1,x,P,I,y;if(R){H=R.getSpacedPoints(l),b=!0,d=!1;let tt=R.isCatmullRomCurve3?R.closed:!1;x=R.computeFrenetFrames(l,tt),P=new X,I=new X,y=new X}d||(f=0,A=0,h=0,m=0);let L=c.extractPoints(o),j=L.shape,N=L.holes;if(!rn.isClockWise(j)){j=j.reverse();for(let tt=0,st=N.length;tt<st;tt++){let at=N[tt];rn.isClockWise(at)&&(N[tt]=at.reverse())}}function G(tt){let at=10000000000000001e-36,yt=tt[0];for(let ut=1;ut<=tt.length;ut++){let wt=ut%tt.length,gt=tt[wt],Jt=gt.x-yt.x,_t=gt.y-yt.y,ne=Jt*Jt+_t*_t,T=Math.max(Math.abs(gt.x),Math.abs(gt.y),Math.abs(yt.x),Math.abs(yt.y)),qe=at*T*T;if(ne<=qe){tt.splice(wt,1),ut--;continue}yt=gt}}G(j),N.forEach(G);let W=N.length,Z=j;for(let tt=0;tt<W;tt++){let st=N[tt];j=j.concat(st)}function B(tt,st,at){return st||kt("ExtrudeGeometry: vec does not exist"),tt.clone().addScaledVector(st,at)}let E=j.length;function et(tt,st,at){let yt,ut,wt,gt=tt.x-st.x,Jt=tt.y-st.y,_t=at.x-tt.x,ne=at.y-tt.y,T=gt*gt+Jt*Jt,qe=gt*ne-Jt*_t;if(Math.abs(qe)>Number.EPSILON){let Qt=Math.sqrt(T),ue=Math.sqrt(_t*_t+ne*ne),ft=st.x-Jt/Qt,Ie=st.y+gt/Qt,Et=at.x-ne/ue,Ut=at.y+_t/ue,S=((Et-ft)*ne-(Ut-Ie)*_t)/(gt*ne-Jt*_t);yt=ft+gt*S-tt.x,ut=Ie+Jt*S-tt.y;let q=yt*yt+ut*ut;if(q<=2)return new qt(yt,ut);wt=Math.sqrt(q/2)}else{let Qt=!1;gt>Number.EPSILON?_t>Number.EPSILON&&(Qt=!0):gt<-Number.EPSILON?_t<-Number.EPSILON&&(Qt=!0):Math.sign(Jt)===Math.sign(ne)&&(Qt=!0),Qt?(yt=-Jt,ut=gt,wt=Math.sqrt(T)):(yt=gt,ut=Jt,wt=Math.sqrt(T/2))}return new qt(yt/wt,ut/wt)}let D=[];for(let tt=0,st=Z.length,at=st-1,yt=tt+1;tt<st;tt++,at++,yt++)at===st&&(at=0),yt===st&&(yt=0),D[tt]=et(Z[tt],Z[at],Z[yt]);let J=[],_,Vt=D.concat();for(let tt=0,st=W;tt<st;tt++){let at=N[tt];_=[];for(let yt=0,ut=at.length,wt=ut-1,gt=yt+1;yt<ut;yt++,wt++,gt++)wt===ut&&(wt=0),gt===ut&&(gt=0),_[yt]=et(at[yt],at[wt],at[gt]);J.push(_),Vt=Vt.concat(_)}let Wt;if(f===0)Wt=rn.triangulateShape(Z,N);else{let tt=[],st=[];for(let at=0;at<f;at++){let yt=at/f,ut=A*Math.cos(yt*Math.PI/2),wt=h*Math.sin(yt*Math.PI/2)+m;for(let gt=0,Jt=Z.length;gt<Jt;gt++){let _t=B(Z[gt],D[gt],wt);Nt(_t.x,_t.y,-ut),yt===0&&tt.push(_t)}for(let gt=0,Jt=W;gt<Jt;gt++){let _t=N[gt];_=J[gt];let ne=[];for(let T=0,qe=_t.length;T<qe;T++){let Qt=B(_t[T],_[T],wt);Nt(Qt.x,Qt.y,-ut),yt===0&&ne.push(Qt)}yt===0&&st.push(ne)}}Wt=rn.triangulateShape(tt,st)}let F=Wt.length,ht=h+m;for(let tt=0;tt<E;tt++){let st=d?B(j[tt],Vt[tt],ht):j[tt];b?(I.copy(x.normals[0]).multiplyScalar(st.x),P.copy(x.binormals[0]).multiplyScalar(st.y),y.copy(H[0]).add(I).add(P),Nt(y.x,y.y,y.z)):Nt(st.x,st.y,0)}for(let tt=1;tt<=l;tt++)for(let st=0;st<E;st++){let at=d?B(j[st],Vt[st],ht):j[st];b?(I.copy(x.normals[tt]).multiplyScalar(at.x),P.copy(x.binormals[tt]).multiplyScalar(at.y),y.copy(H[tt]).add(I).add(P),Nt(y.x,y.y,y.z)):Nt(at.x,at.y,p/l*tt)}for(let tt=f-1;tt>=0;tt--){let st=tt/f,at=A*Math.cos(st*Math.PI/2),yt=h*Math.sin(st*Math.PI/2)+m;for(let ut=0,wt=Z.length;ut<wt;ut++){let gt=B(Z[ut],D[ut],yt);Nt(gt.x,gt.y,p+at)}for(let ut=0,wt=N.length;ut<wt;ut++){let gt=N[ut];_=J[ut];for(let Jt=0,_t=gt.length;Jt<_t;Jt++){let ne=B(gt[Jt],_[Jt],yt);b?Nt(ne.x,ne.y+H[l-1].y,H[l-1].x+at):Nt(ne.x,ne.y,p+at)}}}St(),vt();function St(){let tt=r.length/3;if(d){let st=0,at=E*st;for(let yt=0;yt<F;yt++){let ut=Wt[yt];oe(ut[2]+at,ut[1]+at,ut[0]+at)}st=l+f*2,at=E*st;for(let yt=0;yt<F;yt++){let ut=Wt[yt];oe(ut[0]+at,ut[1]+at,ut[2]+at)}}else{for(let st=0;st<F;st++){let at=Wt[st];oe(at[2],at[1],at[0])}for(let st=0;st<F;st++){let at=Wt[st];oe(at[0]+E*l,at[1]+E*l,at[2]+E*l)}}i.addGroup(tt,r.length/3-tt,0)}function vt(){let tt=r.length/3,st=0;pt(Z,st),st+=Z.length;for(let at=0,yt=N.length;at<yt;at++){let ut=N[at];pt(ut,st),st+=ut.length}i.addGroup(tt,r.length/3-tt,1)}function pt(tt,st){let at=tt.length;for(;--at>=0;){let yt=at,ut=at-1;ut<0&&(ut=tt.length-1);for(let wt=0,gt=l+f*2;wt<gt;wt++){let Jt=E*wt,_t=E*(wt+1),ne=st+yt+Jt,T=st+ut+Jt,qe=st+ut+_t,Qt=st+yt+_t;Xt(ne,T,qe,Qt)}}}function Nt(tt,st,at){u.push(tt),u.push(st),u.push(at)}function oe(tt,st,at){Zt(tt),Zt(st),Zt(at);let yt=r.length/3,ut=O.generateTopUV(i,r,yt-3,yt-2,yt-1);Ct(ut[0]),Ct(ut[1]),Ct(ut[2])}function Xt(tt,st,at,yt){Zt(tt),Zt(st),Zt(yt),Zt(st),Zt(at),Zt(yt);let ut=r.length/3,wt=O.generateSideWallUV(i,r,ut-6,ut-3,ut-2,ut-1);Ct(wt[0]),Ct(wt[1]),Ct(wt[3]),Ct(wt[1]),Ct(wt[2]),Ct(wt[3])}function Zt(tt){r.push(u[tt*3+0]),r.push(u[tt*3+1]),r.push(u[tt*3+2])}function Ct(tt){a.push(tt.x),a.push(tt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,i=this.parameters.options;return Kd(e,i,t)}static fromJSON(t,e){let i=[];for(let a=0,s=t.shapes.length;a<s;a++){let c=e[t.shapes[a]];i.push(c)}let r=t.options.extrudePath;return r!==void 0&&(t.options.extrudePath=new Ec[r.type]().fromJSON(r)),new n(i,t.options)}},Gd={generateTopUV:function(n,t,e,i,r){let a=t[e*3],s=t[e*3+1],c=t[i*3],u=t[i*3+1],o=t[r*3],l=t[r*3+1];return[new qt(a,s),new qt(c,u),new qt(o,l)]},generateSideWallUV:function(n,t,e,i,r,a){let s=t[e*3],c=t[e*3+1],u=t[e*3+2],o=t[i*3],l=t[i*3+1],p=t[i*3+2],d=t[r*3],A=t[r*3+1],h=t[r*3+2],m=t[a*3],f=t[a*3+1],R=t[a*3+2];return Math.abs(c-l)<Math.abs(s-o)?[new qt(s,1-u),new qt(o,1-p),new qt(d,1-h),new qt(m,1-R)]:[new qt(c,1-u),new qt(l,1-p),new qt(A,1-h),new qt(f,1-R)]}};function Kd(n,t,e){if(e.shapes=[],Array.isArray(n))for(let i=0,r=n.length;i<r;i++){let a=n[i];e.shapes.push(a.uuid)}else e.shapes.push(n.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Bi=class n extends ni{constructor(t=1,e=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:r};let a=t/2,s=e/2,c=Math.floor(i),u=Math.floor(r),o=c+1,l=u+1,p=t/c,d=e/u,A=[],h=[],m=[],f=[];for(let R=0;R<l;R++){let O=R*d-s;for(let H=0;H<o;H++){let b=H*p-a;h.push(b,-O,0),m.push(0,0,1),f.push(H/c),f.push(1-R/u)}}for(let R=0;R<u;R++)for(let O=0;O<c;O++){let H=O+o*R,b=O+o*(R+1),x=O+1+o*(R+1),P=O+1+o*R;A.push(H,b,P),A.push(b,x,P)}this.setIndex(A),this.setAttribute("position",new be(h,3)),this.setAttribute("normal",new be(m,3)),this.setAttribute("uv",new be(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}};function fn(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let r=n[e][i];if(fu(r))r.isRenderTargetTexture?(zt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=r.clone();else if(Array.isArray(r))if(fu(r[0])){let a=[];for(let s=0,c=r.length;s<c;s++)a[s]=r[s].clone();t[e][i]=a}else t[e][i]=r.slice();else t[e][i]=r}}return t}function ke(n){let t={};for(let e=0;e<n.length;e++){let i=fn(n[e]);for(let r in i)t[r]=i[r]}return t}function fu(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Fd(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function qo(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ee.workingColorSpace}var dl={clone:fn,merge:ke},Cd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Jd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,fi=class extends Wi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Cd,this.fragmentShader=Jd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=fn(t.uniforms),this.uniformsGroups=Fd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let r in this.uniforms){let s=this.uniforms[r].value;s&&s.isTexture?e.uniforms[r]={type:"t",value:s.toJSON(t).uuid}:s&&s.isColor?e.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?e.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?e.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?e.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?e.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?e.uniforms[r]={type:"m4",value:s.toArray()}:e.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let i in t.uniforms){let r=t.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=e[r.value]||null;break;case"c":this.uniforms[i].value=new Gt().setHex(r.value);break;case"v2":this.uniforms[i].value=new qt().fromArray(r.value);break;case"v3":this.uniforms[i].value=new X().fromArray(r.value);break;case"v4":this.uniforms[i].value=new pe().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Dt().fromArray(r.value);break;case"m4":this.uniforms[i].value=new ce().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Ya=class extends fi{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Ri=class extends Wi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Gt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Gt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Jr,this.normalScale=new qt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new di,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Tr=class extends Ri{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new qt(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Yt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new Gt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Gt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Gt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(t){this._diffuseRoughness>0!=t>0&&this.version++,this._diffuseRoughness=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}get iridescenceThicknessRange(){return an('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(t){an('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),this.iridescenceThicknessMinimum=t[0],this.iridescenceThicknessMaximum=t[1]}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.diffuseRoughness=t.diffuseRoughness,this.diffuseRoughnessMap=t.diffuseRoughnessMap,this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum,this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};var Nr=class extends Wi{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Gt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Jr,this.normalScale=new qt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new di,this.combine=ds,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},_a=class extends Wi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ku,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},$a=class extends Wi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Pn(n,t){return!n||n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function Oa(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var Gi=class{constructor(t,e,i,r){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,r=e[i],a=e[i-1];i:{t:{let s;e:{n:if(!(t<r)){for(let c=i+2;;){if(r===void 0){if(t<a)break n;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===c)break;if(a=r,r=e[++i],t<r)break t}s=e.length;break e}if(!(t>=a)){let c=e[1];t<c&&(i=2,a=c);for(let u=i-2;;){if(a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===u)break;if(r=a,a=e[--i-1],t>=a)break t}s=i,i=0;break e}break i}for(;i<s;){let c=i+s>>>1;t<e[c]?s=c:i=c+1}if(r=e[i],a=e[i-1],a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,a,r)}return this.interpolate_(i,a,t,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,r=this.valueSize,a=t*r;for(let s=0;s!==r;++s)e[s]=i[a+s];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ts=class extends Gi{constructor(t,e,i,r){super(t,e,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Nc,endingEnd:Nc}}intervalChanged_(t,e,i){let r=this.parameterPositions,a=t-2,s=t+1,c=r[a],u=r[s];if(c===void 0)switch(this.getSettings_().endingStart){case Xc:a=t,c=2*e-i;break;case Lc:a=r.length-2,c=e+r[a]-r[a+1];break;default:a=t,c=i}if(u===void 0)switch(this.getSettings_().endingEnd){case Xc:s=t,u=2*i-e;break;case Lc:s=1,u=i+r[1]-r[0];break;default:s=t-1,u=e}let o=(i-e)*.5,l=this.valueSize;this._weightPrev=o/(e-c),this._weightNext=o/(u-i),this._offsetPrev=a*l,this._offsetNext=s*l}interpolate_(t,e,i,r){let a=this.resultBuffer,s=this.sampleValues,c=this.valueSize,u=t*c,o=u-c,l=this._offsetPrev,p=this._offsetNext,d=this._weightPrev,A=this._weightNext,h=(i-e)/(r-e),m=h*h,f=m*h,R=-d*f+2*d*m-d*h,O=(1+d)*f+(-1.5-2*d)*m+(-.5+d)*h+1,H=(-1-A)*f+(1.5+A)*m+.5*h,b=A*f-A*m;for(let x=0;x!==c;++x)a[x]=R*s[l+x]+O*s[o+x]+H*s[u+x]+b*s[p+x];return a}},es=class extends Gi{constructor(t,e,i,r){super(t,e,i,r)}interpolate_(t,e,i,r){let a=this.resultBuffer,s=this.sampleValues,c=this.valueSize,u=t*c,o=u-c,l=(i-e)/(r-e),p=1-l;for(let d=0;d!==c;++d)a[d]=s[o+d]*p+s[u+d]*l;return a}},is=class extends Gi{constructor(t,e,i,r){super(t,e,i,r)}interpolate_(t){return this.copySampleValue_(t-1)}},ns=class extends Gi{interpolate_(t,e,i,r){let a=this.resultBuffer,s=this.sampleValues,c=this.valueSize,u=t*c,o=u-c,l=this.inTangents,p=this.outTangents;if(!l||!p){let h=(i-e)/(r-e),m=1-h;for(let f=0;f!==c;++f)a[f]=s[o+f]*m+s[u+f]*h;return a}let d=c*2,A=t-1;for(let h=0;h!==c;++h){let m=s[o+h],f=s[u+h],R=A*d+h*2,O=p[R],H=p[R+1],b=t*d+h*2,x=l[b],P=l[b+1],I=Yd(i,e,O,x,r);a[h]=Al(I,m,H,P,f)}return a}};function Al(n,t,e,i,r){let a=1-n;return a*a*a*t+3*a*a*n*e+3*a*n*n*i+n*n*n*r}function Qd(n,t,e,i,r){let a=1-n;return 3*a*a*(e-t)+6*a*n*(i-e)+3*n*n*(r-i)}function Yd(n,t,e,i,r){let a=(n-t)/(r-t);for(let s=0;s<8;s++){let c=Al(a,t,e,i,r)-n;if(Math.abs(c)<1e-10)break;let u=Qd(a,t,e,i,r);if(Math.abs(u)<1e-10)break;a=Math.max(0,Math.min(1,a-c/u))}return a}var Ke=class{constructor(t,e,i,r){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Pn(e,this.TimeBufferType),this.values=Pn(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:Pn(t.times,Array),values:Pn(t.values,Array)};let r=t.getInterpolation();r!==t.DefaultInterpolation&&(i.interpolation=r),Oa(t.settings)&&(i.settings={inTangents:Pn(t.settings.inTangents,Array),outTangents:Pn(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new is(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new es(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new ts(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new ns(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case or:e=this.InterpolantFactoryMethodDiscrete;break;case ka:e=this.InterpolantFactoryMethodLinear;break;case Pa:e=this.InterpolantFactoryMethodSmooth;break;case Tc:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return zt("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return or;case this.InterpolantFactoryMethodLinear:return ka;case this.InterpolantFactoryMethodSmooth:return Pa;case this.InterpolantFactoryMethodBezier:return Tc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,r=e.length;i!==r;++i)e[i]+=t;Oa(this.settings)&&(Ru(this.settings.inTangents,t),Ru(this.settings.outTangents,t))}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,r=e.length;i!==r;++i)e[i]*=t;Oa(this.settings)&&(Iu(this.settings.inTangents,t),Iu(this.settings.outTangents,t))}return this}trim(t,e){let i=this.times,r=i.length,a=0,s=r-1;for(;a!==r&&i[a]<t;)++a;for(;s!==-1&&i[s]>e;)--s;if(++s,a!==0||s!==r){a>=s&&(s=Math.max(s,1),a=s-1);let c=this.getValueSize();this.times=i.slice(a,s),this.values=this.values.slice(a*c,s*c)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(kt("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,r=this.values,a=i.length;a===0&&(kt("KeyframeTrack: Track is empty.",this),t=!1);let s=null;for(let c=0;c!==a;c++){let u=i[c];if(typeof u=="number"&&isNaN(u)){kt("KeyframeTrack: Time is not a valid number.",this,c,u),t=!1;break}if(s!==null&&s>u){kt("KeyframeTrack: Out of order keys.",this,c,u,s),t=!1;break}s=u}if(r!==void 0&&_l(r))for(let c=0,u=r.length;c!==u;++c){let o=r[c];if(isNaN(o)){kt("KeyframeTrack: Value is not a valid number.",this,c,o),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===Pa,a=t.length-1,s=1;for(let c=1;c<a;++c){let u=!1,o=t[c],l=t[c+1];if(o!==l&&(c!==1||o!==t[0]))if(r)u=!0;else{let p=c*i,d=p-i,A=p+i;for(let h=0;h!==i;++h){let m=e[p+h];if(m!==e[d+h]||m!==e[A+h]){u=!0;break}}}if(u){if(c!==s){t[s]=t[c];let p=c*i,d=s*i;for(let A=0;A!==i;++A)e[d+A]=e[p+A]}++s}}if(a>0){t[s]=t[a];for(let c=a*i,u=s*i,o=0;o!==i;++o)e[u+o]=e[c+o];++s}return s!==t.length?(this.times=t.slice(0,s),this.values=e.slice(0,s*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,r=new i(this.name,t,e);return r.createInterpolant=this.createInterpolant,Oa(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Ru(n,t){for(let e=0,i=n.length;e!==i;e+=2)n[e]+=t}function Iu(n,t){for(let e=0,i=n.length;e!==i;e+=2)n[e]*=t}Ke.prototype.ValueTypeName="";Ke.prototype.TimeBufferType=Float32Array;Ke.prototype.ValueBufferType=Float32Array;Ke.prototype.DefaultInterpolation=ka;var Ki=class extends Ke{constructor(t,e,i){super(t,e,i)}};Ki.prototype.ValueTypeName="bool";Ki.prototype.ValueBufferType=Array;Ki.prototype.DefaultInterpolation=or;Ki.prototype.InterpolantFactoryMethodLinear=void 0;Ki.prototype.InterpolantFactoryMethodSmooth=void 0;var rs=class extends Ke{constructor(t,e,i,r){super(t,e,i,r)}};rs.prototype.ValueTypeName="color";var as=class extends Ke{constructor(t,e,i,r){super(t,e,i,r)}};as.prototype.ValueTypeName="number";var ss=class extends Gi{constructor(t,e,i,r){super(t,e,i,r)}interpolate_(t,e,i,r){let a=this.resultBuffer,s=this.sampleValues,c=this.valueSize,u=(i-e)/(r-e),o=t*c;for(let l=o+c;o!==l;o+=4)li.slerpFlat(a,0,s,o-c,s,o,u);return a}},Xr=class extends Ke{constructor(t,e,i,r){super(t,e,i,r)}InterpolantFactoryMethodLinear(t){return new ss(this.times,this.values,this.getValueSize(),t)}};Xr.prototype.ValueTypeName="quaternion";Xr.prototype.InterpolantFactoryMethodSmooth=void 0;var Fi=class extends Ke{constructor(t,e,i){super(t,e,i)}};Fi.prototype.ValueTypeName="string";Fi.prototype.ValueBufferType=Array;Fi.prototype.DefaultInterpolation=or;Fi.prototype.InterpolantFactoryMethodLinear=void 0;Fi.prototype.InterpolantFactoryMethodSmooth=void 0;var cs=class extends Ke{constructor(t,e,i,r){super(t,e,i,r)}};cs.prototype.ValueTypeName="vector";var ga={enabled:!1,files:{},add:function(n,t){this.enabled!==!1&&(hu(n)||(this.files[n]=t))},get:function(n){if(this.enabled!==!1&&!hu(n))return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};function hu(n){try{let t=n.slice(n.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}var os=class{constructor(t,e,i){let r=this,a=!1,s=0,c=0,u,o=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(l){c++,a===!1&&r.onStart!==void 0&&r.onStart(l,s,c),a=!0},this.itemEnd=function(l){s++,r.onProgress!==void 0&&r.onProgress(l,s,c),s===c&&(a=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(l){r.onError!==void 0&&r.onError(l)},this.resolveURL=function(l){return l=l.normalize("NFC"),u?u(l):l},this.setURLModifier=function(l){return u=l,this},this.addHandler=function(l,p){return o.push(l,p),this},this.removeHandler=function(l){let p=o.indexOf(l);return p!==-1&&o.splice(p,2),this},this.getHandler=function(l){for(let p=0,d=o.length;p<d;p+=2){let A=o[p],h=o[p+1];if(A.global&&(A.lastIndex=0),A.test(l))return h}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},pl=new os,Un=class{constructor(t){this.manager=t!==void 0?t:pl,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let i=this;return new Promise(function(r,a){i.load(t,r,e,a)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}setPriority(t){return this.priority=t,this}setCache(t){return this.cache=t,this}abort(){return this}};Un.DEFAULT_MATERIAL_NAME="__DEFAULT";var xn=new WeakMap,us=class extends Un{constructor(t){super(t)}load(t,e,i,r){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let a=this,s=ga.get(`image:${t}`);if(s!==void 0){if(s.complete===!0)a.manager.itemStart(t),setTimeout(function(){e&&e(s),a.manager.itemEnd(t)},0);else{let p=xn.get(s);p===void 0&&(p=[],xn.set(s,p)),p.push({onLoad:e,onError:r})}return s}let c=Nn("img");function u(){l(),e&&e(this);let p=xn.get(this)||[];for(let d=0;d<p.length;d++){let A=p[d];A.onLoad&&A.onLoad(this)}xn.delete(this),a.manager.itemEnd(t)}function o(p){l(),r&&r(p),ga.remove(`image:${t}`);let d=xn.get(this)||[];for(let A=0;A<d.length;A++){let h=d[A];h.onError&&h.onError(p)}xn.delete(this),a.manager.itemError(t),a.manager.itemEnd(t)}function l(){c.removeEventListener("load",u,!1),c.removeEventListener("error",o,!1)}return c.addEventListener("load",u,!1),c.addEventListener("error",o,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(c.crossOrigin=this.crossOrigin),ga.add(`image:${t}`,c),a.manager.itemStart(t),c.fetchPriority=this.priority,c.src=t,c}};var Dn=class extends Un{constructor(t){super(t)}load(t,e,i,r){let a=new ze,s=new us(this.manager);return s.setPriority(this.priority),s.setCache(this.cache),s.setCrossOrigin(this.crossOrigin),s.setPath(this.path),s.load(t,function(c){a.image=c,a.needsUpdate=!0,e!==void 0&&e(a)},i,r),a}},Lr=class extends We{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Gt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}};var vc=new ce,qu=new X,Vu=new X,Er=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new qt(512,512),this.mapType=De,this.map=null,this.mapPass=null,this.matrix=new ce,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Mi,this._frameExtents=new qt(1,1),this._viewportCount=1,this._viewports=[new pe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;qu.setFromMatrixPosition(t.matrixWorld),e.position.copy(qu),Vu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Vu),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,i,r){vc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),i.setFromProjectionMatrix(vc,t.coordinateSystem,t.reversedDepth);let a=this._frameExtents,s=r?r.z/a.x:1,c=r?r.w/a.y:1,u=r?r.x/a.x:0,o=r?r.y/a.y:0;t.coordinateSystem===Tn||t.reversedDepth?e.set(.5*s,0,0,.5*s+u,0,.5*c,0,.5*c+o,0,0,1,0,0,0,0,1):e.set(.5*s,0,0,.5*s+u,0,.5*c,0,.5*c+o,0,0,.5,.5,0,0,0,1),e.multiply(vc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Sa=new X,Ha=new li,ci=new X,zr=class extends We{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ce,this.projectionMatrix=new ce,this.projectionMatrixInverse=new ce,this.coordinateSystem=Ce,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Sa,Ha,ci),ci.x===1&&ci.y===1&&ci.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Sa,Ha,ci.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(Sa,Ha,ci),ci.x===1&&ci.y===1&&ci.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Sa,Ha,ci.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ui=new X,mu=new qt,bu=new qt,Ee=class extends zr{constructor(t=50,e=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=wa*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(cc*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return wa*2*Math.atan(Math.tan(cc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Ui.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ui.x,Ui.y).multiplyScalar(-t/Ui.z),Ui.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ui.x,Ui.y).multiplyScalar(-t/Ui.z)}getViewSize(t,e){return this.getViewBounds(t,mu,bu),e.subVectors(bu,mu)}setViewOffset(t,e,i,r,a,s){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(cc*.5*this.fov)/this.zoom,i=2*e,r=this.aspect*i,a=-.5*r,s=this.view;if(this.view!==null&&this.view.enabled){let u=s.fullWidth,o=s.fullHeight;a+=s.offsetX*r/u,e-=s.offsetY*i/o,r*=s.width/u,i*=s.height/o}let c=this.filmOffset;c!==0&&(a+=t*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Uc=class extends Er{constructor(){super(new Ee(90,1,.5,500)),this.isPointLightShadow=!0}},kr=class extends Lr{constructor(t,e,i=0,r=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new Uc}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}},wr=class extends zr{constructor(t=-1,e=1,i=1,r=-1,a=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=r,this.near=a,this.far=s,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,r,a,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,a=i-t,s=i+t,c=r+e,u=r-e;if(this.view!==null&&this.view.enabled){let o=(this.right-this.left)/this.view.fullWidth/this.zoom,l=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=o*this.view.offsetX,s=a+o*this.view.width,c-=l*this.view.offsetY,u=c-l*this.view.height}this.projectionMatrix.makeOrthographic(a,s,c,u,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Dc=class extends Er{constructor(){super(new wr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ur=class extends Lr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(We.DEFAULT_UP),this.updateMatrix(),this.target=new We,this.shadow=new Dc}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var gn=-90,Wn=1,Zn=class extends We{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Ee(gn,Wn,t,e);r.layers=this.layers,this.add(r);let a=new Ee(gn,Wn,t,e);a.layers=this.layers,this.add(a);let s=new Ee(gn,Wn,t,e);s.layers=this.layers,this.add(s);let c=new Ee(gn,Wn,t,e);c.layers=this.layers,this.add(c);let u=new Ee(gn,Wn,t,e);u.layers=this.layers,this.add(u);let o=new Ee(gn,Wn,t,e);o.layers=this.layers,this.add(o)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,r,a,s,c,u]=e;for(let o of e)this.remove(o);if(t===Ce)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),u.up.set(0,1,0),u.lookAt(0,0,-1);else if(t===Tn)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),u.up.set(0,-1,0),u.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let o of e)this.add(o),o.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[a,s,c,u,o,l]=this.children,p=t.getRenderTarget(),d=t.getActiveCubeFace(),A=t.getActiveMipmapLevel(),h=t.xr.enabled;t.xr.enabled=!1;let m=i.texture.mipmapsAutoUpdate;i.texture.mipmapsAutoUpdate=!1;let f=!1;t.isWebGLRenderer===!0?f=t.state.buffers.depth.getReversed():f=t.reversedDepthBuffer,t.setRenderTarget(i,0,r),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,1,r),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,s),t.setRenderTarget(i,2,r),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(i,3,r),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(i,4,r),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),i.texture.mipmapsAutoUpdate=m,t.setRenderTarget(i,5,r),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(p,d,A),t.xr.enabled=h,i.texture.needsPMREMUpdate=!0}},ls=class extends Ee{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}};var Vo="\\[\\]\\.:\\/",_d=new RegExp("["+Vo+"]","g"),mo="[^"+Vo+"]",$d="[^"+Vo.replace("\\.","")+"]",tA=/((?:WC+[\/:])*)/.source.replace("WC",mo),eA=/(WCOD+)?/.source.replace("WCOD",$d),iA=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",mo),nA=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",mo),rA=new RegExp("^"+tA+eA+iA+nA+"$"),aA=["material","materials","bones","map"],Zc=class{constructor(t,e,i){let r=i||Ae.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,r)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,a=i.length;r!==a;++r)i[r].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},Ae=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(_d,"")}static parseTrackName(t){let e=rA.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let a=i.nodeName.substring(r+1);aA.indexOf(a)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=a)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(a){for(let s=0;s<a.length;s++){let c=a[s];if(c.name===e||c.uuid===e)return c;let u=i(c.children);if(u)return u}return null},r=i(t.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let r=0,a=i.length;r!==a;++r)t[e++]=i[r]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let r=0,a=i.length;r!==a;++r)i[r]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let r=0,a=i.length;r!==a;++r)i[r]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let r=0,a=i.length;r!==a;++r)i[r]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,r=e.propertyName,a=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){zt("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let o=e.objectIndex;switch(i){case"materials":if(!t.material){kt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){kt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){kt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let l=0;l<t.length;l++)if(t[l].name===o){o=l;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){kt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){kt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){kt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(o!==void 0){if(t[o]===void 0){kt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[o]}}let s=t[r];if(s===void 0){let o=e.nodeName;kt("PropertyBinding: Trying to update property for track: "+o+"."+r+" but it wasn't found.",t);return}let c=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?c=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(c=this.Versioning.MatrixWorldNeedsUpdate);let u=this.BindingType.Direct;if(a!==void 0){if(r==="morphTargetInfluences"){if(!t.geometry){kt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){kt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}u=this.BindingType.ArrayElement,this.resolvedProperty=s,this.propertyIndex=a}else s.fromArray!==void 0&&s.toArray!==void 0?(u=this.BindingType.HasFromToArray,this.resolvedProperty=s):Array.isArray(s)?(u=this.BindingType.EntireArray,this.resolvedProperty=s):this.propertyName=r;this.getValue=this.GetterByBindingType[u],this.setValue=this.SetterByBindingTypeAndVersioning[u][c]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ae.Composite=Zc;Ae.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ae.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ae.prototype.GetterByBindingType=[Ae.prototype._getValue_direct,Ae.prototype._getValue_array,Ae.prototype._getValue_arrayElement,Ae.prototype._getValue_toArray];Ae.prototype.SetterByBindingTypeAndVersioning=[[Ae.prototype._setValue_direct,Ae.prototype._setValue_direct_setNeedsUpdate,Ae.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ae.prototype._setValue_array,Ae.prototype._setValue_array_setNeedsUpdate,Ae.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ae.prototype._setValue_arrayElement,Ae.prototype._setValue_arrayElement_setNeedsUpdate,Ae.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ae.prototype._setValue_fromArray,Ae.prototype._setValue_fromArray_setNeedsUpdate,Ae.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Q1=new Float32Array(1);var Mc=class{static{this.prototype.isMatrix2=!0}constructor(t,e,i,r){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,r){let a=this.elements;return a[0]=t,a[2]=e,a[1]=i,a[3]=r,this}};function bo(n,t,e,i){let r=sA(i);switch(e){case oo:return n*t;case qs:return n*t/r.components*r.byteLength;case Vs:return n*t/r.components*r.byteLength;case Ji:return n*t*2/r.components*r.byteLength;case ms:return n*t*2/r.components*r.byteLength;case uo:return n*t*3/r.components*r.byteLength;case si:return n*t*4/r.components*r.byteLength;case bs:return n*t*4/r.components*r.byteLength;case Mr:case Br:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Gr:case Kr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Os:case Hs:return Math.max(n,16)*Math.max(t,8)/4;case ys:case Ss:return Math.max(n,8)*Math.max(t,8)/2;case Ps:case xs:case Ws:case js:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case gs:case Fr:case vs:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ts:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ns:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Xs:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Ls:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Es:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case zs:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case ks:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case ws:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Us:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Ds:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Zs:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Ms:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Bs:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Gs:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Ks:case Fs:case Cs:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Js:case Qs:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Cr:case Ys:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function sA(n){switch(n){case De:case ro:return{byteLength:1,components:1};case Kn:case ao:case ai:return{byteLength:2,components:1};case Is:case hs:return{byteLength:2,components:4};case ri:case Rs:case Je:return{byteLength:4,components:1};case so:case co:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?zt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function Ll(){let n=null,t=!1,e=null,i=null;function r(a,s){i=n.requestAnimationFrame(r),e(a,s)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(r),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(a){e=a},setContext:function(a){n=a}}}function oA(n){let t=new WeakMap;function e(c,u){let o=c.array,l=c.usage,p=o.byteLength,d=n.createBuffer();n.bindBuffer(u,d),n.bufferData(u,o,l),c.onUploadCallback();let A;if(o instanceof Float32Array)A=n.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)A=n.HALF_FLOAT;else if(o instanceof Uint16Array)c.isFloat16BufferAttribute?A=n.HALF_FLOAT:A=n.UNSIGNED_SHORT;else if(o instanceof Int16Array)A=n.SHORT;else if(o instanceof Uint32Array)A=n.UNSIGNED_INT;else if(o instanceof Int32Array)A=n.INT;else if(o instanceof Int8Array)A=n.BYTE;else if(o instanceof Uint8Array)A=n.UNSIGNED_BYTE;else if(o instanceof Uint8ClampedArray)A=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);return{buffer:d,type:A,bytesPerElement:o.BYTES_PER_ELEMENT,version:c.version,size:p}}function i(c,u,o){let l=u.array,p=u.updateRanges;if(n.bindBuffer(o,c),p.length===0)n.bufferSubData(o,0,l);else{p.sort((A,h)=>A.start-h.start);let d=0;for(let A=1;A<p.length;A++){let h=p[d],m=p[A];m.start<=h.start+h.count+1?h.count=Math.max(h.count,m.start+m.count-h.start):(++d,p[d]=m)}p.length=d+1;for(let A=0,h=p.length;A<h;A++){let m=p[A];n.bufferSubData(o,m.start*l.BYTES_PER_ELEMENT,l,m.start,m.count)}u.clearUpdateRanges()}u.onUploadCallback()}function r(c){return c.isInterleavedBufferAttribute&&(c=c.data),t.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);let u=t.get(c);u&&(n.deleteBuffer(u.buffer),t.delete(c))}function s(c,u){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){let l=t.get(c);(!l||l.version<c.version)&&t.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}let o=t.get(c);if(o===void 0)t.set(c,e(c,u));else if(o.version<c.version){if(o.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(o.buffer,c,u),o.version=c.version}}return{get:r,remove:a,update:s}}var uA=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,lA=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,dA=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,AA=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,pA=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,fA=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,RA=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,IA=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,hA=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,qA=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,VA=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,mA=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bA=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,yA=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,OA=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,SA=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,HA=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,PA=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,xA=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,gA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,WA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,jA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,vA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,TA=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,NA=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,XA=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,LA=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,EA=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,zA=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,kA="gl_FragColor = linearToOutputTexel( gl_FragColor );",wA=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,UA=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,DA=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,ZA=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,MA=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,BA=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,GA=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,KA=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,FA=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,CA=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,JA=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,QA=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,YA=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,_A=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$A=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,tp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,ep=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ip=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,np=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,rp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ap=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,sp=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,cp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,op=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,up=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lp=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,dp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ap=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Rp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ip=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,hp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,qp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Vp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,mp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,bp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,yp=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Op=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Sp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Hp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Pp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,xp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,gp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,vp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Tp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Np=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Xp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Lp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ep=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,zp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,kp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,wp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Up=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Dp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Zp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Mp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Bp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Gp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Kp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Fp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Cp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Jp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Qp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Yp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,_p=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,$p=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ef=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,nf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,rf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,af=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,sf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,cf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,of=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,uf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,lf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,df=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Af=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ff=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,If=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,hf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,qf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Vf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,mf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,yf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Of=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Sf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Pf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,gf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,jf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,vf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Tf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Nf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Xf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ef=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,kf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,wf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Uf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Df=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Zf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ft={alphahash_fragment:uA,alphahash_pars_fragment:lA,alphamap_fragment:dA,alphamap_pars_fragment:AA,alphatest_fragment:pA,alphatest_pars_fragment:fA,aomap_fragment:RA,aomap_pars_fragment:IA,batching_pars_vertex:hA,batching_vertex:qA,begin_vertex:VA,beginnormal_vertex:mA,bsdfs:bA,iridescence_fragment:yA,bumpmap_pars_fragment:OA,clipping_planes_fragment:SA,clipping_planes_pars_fragment:HA,clipping_planes_pars_vertex:PA,clipping_planes_vertex:xA,color_fragment:gA,color_pars_fragment:WA,color_pars_vertex:jA,color_vertex:vA,common:TA,defaultnormal_vertex:NA,displacementmap_pars_vertex:XA,displacementmap_vertex:LA,emissivemap_fragment:EA,emissivemap_pars_fragment:zA,colorspace_fragment:kA,colorspace_pars_fragment:wA,envmap_fragment:UA,envmap_common_pars_fragment:DA,envmap_pars_fragment:ZA,envmap_pars_vertex:MA,envmap_physical_pars_fragment:tp,envmap_vertex:BA,fog_vertex:GA,fog_pars_vertex:KA,fog_fragment:FA,fog_pars_fragment:CA,gradientmap_pars_fragment:JA,lightmap_pars_fragment:QA,lights_lambert_fragment:YA,lights_lambert_pars_fragment:_A,lights_pars_begin:$A,lights_toon_fragment:ep,lights_toon_pars_fragment:ip,lights_phong_fragment:np,lights_phong_pars_fragment:rp,lights_physical_fragment:ap,lights_physical_pars_fragment:sp,lights_fragment_begin:cp,lights_fragment_maps:op,lights_fragment_end:up,lightprobes_pars_fragment:lp,logdepthbuf_fragment:dp,logdepthbuf_pars_fragment:Ap,logdepthbuf_pars_vertex:pp,logdepthbuf_vertex:fp,map_fragment:Rp,map_pars_fragment:Ip,map_particle_fragment:hp,map_particle_pars_fragment:qp,metalnessmap_fragment:Vp,metalnessmap_pars_fragment:mp,morphinstance_vertex:bp,morphcolor_vertex:yp,morphnormal_vertex:Op,morphtarget_pars_vertex:Sp,morphtarget_vertex:Hp,normal_fragment_begin:Pp,normal_fragment_maps:xp,normal_pars_fragment:gp,normal_pars_vertex:Wp,normal_vertex:jp,normalmap_pars_fragment:vp,clearcoat_normal_fragment_begin:Tp,clearcoat_normal_fragment_maps:Np,clearcoat_pars_fragment:Xp,iridescence_pars_fragment:Lp,opaque_fragment:Ep,packing:zp,premultiplied_alpha_fragment:kp,project_vertex:wp,dithering_fragment:Up,dithering_pars_fragment:Dp,roughnessmap_fragment:Zp,roughnessmap_pars_fragment:Mp,shadowmap_pars_fragment:Bp,shadowmap_pars_vertex:Gp,shadowmap_vertex:Kp,shadowmask_pars_fragment:Fp,skinbase_vertex:Cp,skinning_pars_vertex:Jp,skinning_vertex:Qp,skinnormal_vertex:Yp,specularmap_fragment:_p,specularmap_pars_fragment:$p,tonemapping_fragment:tf,tonemapping_pars_fragment:ef,transmission_fragment:nf,transmission_pars_fragment:rf,uv_pars_fragment:af,uv_pars_vertex:sf,uv_vertex:cf,worldpos_vertex:of,background_vert:uf,background_frag:lf,backgroundCube_vert:df,backgroundCube_frag:Af,cube_vert:pf,cube_frag:ff,depth_vert:Rf,depth_frag:If,distance_vert:hf,distance_frag:qf,equirect_vert:Vf,equirect_frag:mf,linedashed_vert:bf,linedashed_frag:yf,meshbasic_vert:Of,meshbasic_frag:Sf,meshlambert_vert:Hf,meshlambert_frag:Pf,meshmatcap_vert:xf,meshmatcap_frag:gf,meshnormal_vert:Wf,meshnormal_frag:jf,meshphong_vert:vf,meshphong_frag:Tf,meshphysical_vert:Nf,meshphysical_frag:Xf,meshtoon_vert:Lf,meshtoon_frag:Ef,points_vert:zf,points_frag:kf,shadow_vert:wf,shadow_frag:Uf,sprite_vert:Df,sprite_frag:Zf},bt={common:{diffuse:{value:new Gt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Dt},alphaMap:{value:null},alphaMapTransform:{value:new Dt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Dt}},envmap:{envMap:{value:null},envMapRotation:{value:new Dt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Dt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Dt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Dt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Dt},normalScale:{value:new qt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Dt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Dt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Dt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Dt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Gt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Gt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Dt},alphaTest:{value:0},uvTransform:{value:new Dt}},sprite:{diffuse:{value:new Gt(16777215)},opacity:{value:1},center:{value:new qt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Dt},alphaMap:{value:null},alphaMapTransform:{value:new Dt},alphaTest:{value:0}}},Vi={basic:{uniforms:ke([bt.common,bt.specularmap,bt.envmap,bt.aomap,bt.lightmap,bt.fog]),vertexShader:Ft.meshbasic_vert,fragmentShader:Ft.meshbasic_frag},lambert:{uniforms:ke([bt.common,bt.specularmap,bt.envmap,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.fog,bt.lights,{emissive:{value:new Gt(0)},envMapIntensity:{value:1}}]),vertexShader:Ft.meshlambert_vert,fragmentShader:Ft.meshlambert_frag},phong:{uniforms:ke([bt.common,bt.specularmap,bt.envmap,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.fog,bt.lights,{emissive:{value:new Gt(0)},specular:{value:new Gt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ft.meshphong_vert,fragmentShader:Ft.meshphong_frag},standard:{uniforms:ke([bt.common,bt.envmap,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.roughnessmap,bt.metalnessmap,bt.fog,bt.lights,{emissive:{value:new Gt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag},toon:{uniforms:ke([bt.common,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.gradientmap,bt.fog,bt.lights,{emissive:{value:new Gt(0)}}]),vertexShader:Ft.meshtoon_vert,fragmentShader:Ft.meshtoon_frag},matcap:{uniforms:ke([bt.common,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.fog,{matcap:{value:null}}]),vertexShader:Ft.meshmatcap_vert,fragmentShader:Ft.meshmatcap_frag},points:{uniforms:ke([bt.points,bt.fog]),vertexShader:Ft.points_vert,fragmentShader:Ft.points_frag},dashed:{uniforms:ke([bt.common,bt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ft.linedashed_vert,fragmentShader:Ft.linedashed_frag},depth:{uniforms:ke([bt.common,bt.displacementmap]),vertexShader:Ft.depth_vert,fragmentShader:Ft.depth_frag},normal:{uniforms:ke([bt.common,bt.bumpmap,bt.normalmap,bt.displacementmap,{opacity:{value:1}}]),vertexShader:Ft.meshnormal_vert,fragmentShader:Ft.meshnormal_frag},sprite:{uniforms:ke([bt.sprite,bt.fog]),vertexShader:Ft.sprite_vert,fragmentShader:Ft.sprite_frag},background:{uniforms:{uvTransform:{value:new Dt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ft.background_vert,fragmentShader:Ft.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Dt}},vertexShader:Ft.backgroundCube_vert,fragmentShader:Ft.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ft.cube_vert,fragmentShader:Ft.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ft.equirect_vert,fragmentShader:Ft.equirect_frag},distance:{uniforms:ke([bt.common,bt.displacementmap,{referencePosition:{value:new X},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ft.distance_vert,fragmentShader:Ft.distance_frag},shadow:{uniforms:ke([bt.lights,bt.fog,{color:{value:new Gt(0)},opacity:{value:1}}]),vertexShader:Ft.shadow_vert,fragmentShader:Ft.shadow_frag}};Vi.physical={uniforms:ke([Vi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Dt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Dt},clearcoatNormalScale:{value:new qt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Dt},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Dt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Dt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Dt},sheen:{value:0},sheenColor:{value:new Gt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Dt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Dt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Dt},transmissionSamplerSize:{value:new qt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Dt},attenuationDistance:{value:0},attenuationColor:{value:new Gt(0)},specularColor:{value:new Gt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Dt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Dt},anisotropyVector:{value:new qt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Dt}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag};var _s={r:0,b:0,g:0},Mf=new ce,El=new Dt;El.set(-1,0,0,0,1,0,0,0,1);function Bf(n,t,e,i,r,a){let s=new Gt(0),c=r===!0?0:1,u,o,l=null,p=0,d=null;function A(O){let H=O.isScene===!0?O.background:null;if(H&&H.isTexture){let b=O.backgroundBlurriness>0;H=t.get(H,b)}return H}function h(O){let H=!1,b=A(O);b===null?f(s,c):b&&b.isColor&&(f(b,1),H=!0);let x=n.xr.getEnvironmentBlendMode();x==="additive"?e.buffers.color.setClear(0,0,0,1,a):x==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,a),(n.autoClear||H)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(O,H){let b=A(H);b&&b.isCubeTexture?(o===void 0&&(o=new he(new pi(1,1,1),new fi({name:"BackgroundCubeMaterial",uniforms:fn(Vi.backgroundCube.uniforms),vertexShader:Vi.backgroundCube.vertexShader,fragmentShader:Vi.backgroundCube.fragmentShader,side:je,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),o.geometry.deleteAttribute("normal"),o.geometry.deleteAttribute("uv"),o.onBeforeRender=function(x,P,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(o.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(o)),o.material.uniforms.envMap.value=b,o.material.uniforms.backgroundBlurriness.value=H.backgroundBlurriness,o.material.uniforms.backgroundIntensity.value=H.backgroundIntensity,o.material.uniforms.backgroundRotation.value.setFromMatrix4(Mf.makeRotationFromEuler(H.backgroundRotation)).transpose(),b.isRenderTargetTexture===!1&&o.material.uniforms.backgroundRotation.value.premultiply(El),o.material.toneMapped=ee.getTransfer(b.colorSpace)!==ae,(l!==b||p!==b.version||d!==n.toneMapping)&&(o.material.needsUpdate=!0,l=b,p=b.version,d=n.toneMapping),o.layers.enableAll(),O.unshift(o,o.geometry,o.material,0,0,null)):b&&b.isTexture&&(u===void 0&&(u=new he(new Bi(2,2),new fi({name:"BackgroundMaterial",uniforms:fn(Vi.background.uniforms),vertexShader:Vi.background.vertexShader,fragmentShader:Vi.background.fragmentShader,side:Ci,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(u)),u.material.uniforms.t2D.value=b,u.material.uniforms.backgroundIntensity.value=H.backgroundIntensity,u.material.toneMapped=ee.getTransfer(b.colorSpace)!==ae,b.matrixAutoUpdate===!0&&b.updateMatrix(),u.material.uniforms.uvTransform.value.copy(b.matrix),(l!==b||p!==b.version||d!==n.toneMapping)&&(u.material.needsUpdate=!0,l=b,p=b.version,d=n.toneMapping),u.layers.enableAll(),O.unshift(u,u.geometry,u.material,0,0,null))}function f(O,H){O.getRGB(_s,qo(n)),e.buffers.color.setClear(_s.r,_s.g,_s.b,H,a)}function R(){o!==void 0&&(o.geometry.dispose(),o.material.dispose(),o=void 0),u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0)}return{getClearColor:function(){return s},setClearColor:function(O,H=1){s.set(O),c=H,f(s,c)},getClearAlpha:function(){return c},setClearAlpha:function(O){c=O,f(s,c)},render:h,addToRenderList:m,dispose:R}}function Gf(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null),a=r,s=!1;function c(N,z,G,W,Z){let B=!1,E=p(N,W,G,z);a!==E&&(a=E,o(a.object)),B=A(N,W,G,Z),B&&h(N,W,G,Z),Z!==null&&t.update(Z,n.ELEMENT_ARRAY_BUFFER),(B||s)&&(s=!1,b(N,z,G,W),Z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(Z).buffer))}function u(){return n.createVertexArray()}function o(N){return n.bindVertexArray(N)}function l(N){return n.deleteVertexArray(N)}function p(N,z,G,W){let Z=W.wireframe===!0,B=i[z.id];B===void 0&&(B={},i[z.id]=B);let E=N.isInstancedMesh===!0?N.id:0,et=B[E];et===void 0&&(et={},B[E]=et);let D=et[G.id];D===void 0&&(D={},et[G.id]=D);let J=D[Z];return J===void 0&&(J=d(u()),D[Z]=J),J}function d(N){let z=[],G=[],W=[];for(let Z=0;Z<e;Z++)z[Z]=0,G[Z]=0,W[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:G,attributeDivisors:W,object:N,attributes:{},index:null}}function A(N,z,G,W){let Z=a.attributes,B=z.attributes,E=0,et=G.getAttributes();for(let D in et)if(et[D].location>=0){let _=Z[D],Vt=B[D];if(Vt===void 0&&(D==="instanceMatrix"&&N.instanceMatrix&&(Vt=N.instanceMatrix),D==="instanceColor"&&N.instanceColor&&(Vt=N.instanceColor)),_===void 0||_.attribute!==Vt||Vt&&_.data!==Vt.data)return!0;E++}return a.attributesNum!==E||a.index!==W}function h(N,z,G,W){let Z={},B=z.attributes,E=0,et=G.getAttributes();for(let D in et)if(et[D].location>=0){let _=B[D];_===void 0&&(D==="instanceMatrix"&&N.instanceMatrix&&(_=N.instanceMatrix),D==="instanceColor"&&N.instanceColor&&(_=N.instanceColor));let Vt={};Vt.attribute=_,_&&_.data&&(Vt.data=_.data),Z[D]=Vt,E++}a.attributes=Z,a.attributesNum=E,a.index=W}function m(){let N=a.newAttributes;for(let z=0,G=N.length;z<G;z++)N[z]=0}function f(N){R(N,0)}function R(N,z){let G=a.newAttributes,W=a.enabledAttributes,Z=a.attributeDivisors;G[N]=1,W[N]===0&&(n.enableVertexAttribArray(N),W[N]=1),Z[N]!==z&&(n.vertexAttribDivisor(N,z),Z[N]=z)}function O(){let N=a.newAttributes,z=a.enabledAttributes;for(let G=0,W=z.length;G<W;G++)z[G]!==N[G]&&(n.disableVertexAttribArray(G),z[G]=0)}function H(N,z,G,W,Z,B,E){E===!0?n.vertexAttribIPointer(N,z,G,Z,B):n.vertexAttribPointer(N,z,G,W,Z,B)}function b(N,z,G,W){m();let Z=W.attributes,B=G.getAttributes(),E=z.defaultAttributeValues;for(let et in B){let D=B[et];if(D.location>=0){let J=Z[et];if(J===void 0&&(et==="instanceMatrix"&&N.instanceMatrix&&(J=N.instanceMatrix),et==="instanceColor"&&N.instanceColor&&(J=N.instanceColor)),J!==void 0){let _=J.normalized,Vt=J.itemSize,Wt=t.get(J);if(Wt===void 0)continue;let F=Wt.buffer,ht=Wt.type,St=Wt.bytesPerElement,vt=ht===n.INT||ht===n.UNSIGNED_INT||J.gpuType===Rs;if(J.isInterleavedBufferAttribute){let pt=J.data,Nt=pt.isInterleavedBuffer===!0?pt.stride:pt.itemSize,oe=J.offset;if(pt.isInstancedInterleavedBuffer||pt.isInstancedBufferAttribute){for(let Xt=0;Xt<D.locationSize;Xt++)R(D.location+Xt,pt.meshPerAttribute);N.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=pt.meshPerAttribute*pt.count)}else for(let Xt=0;Xt<D.locationSize;Xt++)f(D.location+Xt);n.bindBuffer(n.ARRAY_BUFFER,F);for(let Xt=0;Xt<D.locationSize;Xt++)H(D.location+Xt,Vt/D.locationSize,ht,_,Nt*St,(oe+Vt/D.locationSize*Xt)*St,vt)}else{if(J.isInstancedBufferAttribute){for(let pt=0;pt<D.locationSize;pt++)R(D.location+pt,J.meshPerAttribute);N.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let pt=0;pt<D.locationSize;pt++)f(D.location+pt);n.bindBuffer(n.ARRAY_BUFFER,F);for(let pt=0;pt<D.locationSize;pt++)H(D.location+pt,Vt/D.locationSize,ht,_,Vt*St,Vt/D.locationSize*pt*St,vt)}}else if(E!==void 0){let _=E[et];if(_!==void 0)switch(_.length){case 2:n.vertexAttrib2fv(D.location,_);break;case 3:n.vertexAttrib3fv(D.location,_);break;case 4:n.vertexAttrib4fv(D.location,_);break;default:n.vertexAttrib1fv(D.location,_)}}}}O()}function x(){L();for(let N in i){let z=i[N];for(let G in z){let W=z[G];for(let Z in W){let B=W[Z];for(let E in B)l(B[E].object),delete B[E];delete W[Z]}}delete i[N]}}function P(N){if(i[N.id]===void 0)return;let z=i[N.id];for(let G in z){let W=z[G];for(let Z in W){let B=W[Z];for(let E in B)l(B[E].object),delete B[E];delete W[Z]}}delete i[N.id]}function I(N){for(let z in i){let G=i[z];for(let W in G){let Z=G[W];if(Z[N.id]===void 0)continue;let B=Z[N.id];for(let E in B)l(B[E].object),delete B[E];delete Z[N.id]}}}function y(N){for(let z in i){let G=i[z],W=N.isInstancedMesh===!0?N.id:0,Z=G[W];if(Z!==void 0){for(let B in Z){let E=Z[B];for(let et in E)l(E[et].object),delete E[et];delete Z[B]}delete G[W],Object.keys(G).length===0&&delete i[z]}}}function L(){j(),s=!0,a!==r&&(a=r,o(a.object))}function j(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:c,reset:L,resetDefaultState:j,dispose:x,releaseStatesOfGeometry:P,releaseStatesOfObject:y,releaseStatesOfProgram:I,initAttributes:m,enableAttribute:f,disableUnusedAttributes:O}}function Kf(n,t,e){let i;function r(u){i=u}function a(u,o){n.drawArrays(i,u,o),e.update(o,i,1)}function s(u,o,l){l!==0&&(n.drawArraysInstanced(i,u,o,l),e.update(o,i,l))}function c(u,o,l){if(l===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,u,0,o,0,l);let d=0;for(let A=0;A<l;A++)d+=o[A];e.update(d,i,1)}this.setMode=r,this.render=a,this.renderInstances=s,this.renderMultiDraw=c}function Ff(n,t,e,i){let r;function a(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){let I=t.get("EXT_texture_filter_anisotropic");r=n.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function s(I){return!(I!==si&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(I){let y=I===ai&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(I!==De&&I!==Je&&!y&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function u(I){if(I==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let o=e.precision!==void 0?e.precision:"highp",l=u(o);l!==o&&(zt("WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);let p=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=e.logarithmicDepthBuffer===!0&&p===!1;e.reversedDepthBuffer===!0&&p===!1&&zt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&p===!0&&zt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let A=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),h=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_TEXTURE_SIZE),f=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),R=n.getParameter(n.MAX_VERTEX_ATTRIBS),O=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),H=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),x=n.getParameter(n.MAX_SAMPLES),P=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:u,textureFormatReadable:s,textureTypeReadable:c,precision:o,logarithmicDepthBuffer:d,reversedDepthBuffer:p,maxTextures:A,maxVertexTextures:h,maxTextureSize:m,maxCubemapSize:f,maxAttributes:R,maxVertexUniforms:O,maxVaryings:H,maxFragmentUniforms:b,maxSamples:x,samples:P}}function Cf(n){let t=this,e=null,i=0,r=!1,a=!1,s=new ei,c=new Dt,u={value:null,needsUpdate:!1};this.uniform=u,this.numPlanes=0,this.numIntersection=0,this.init=function(p,d){let A=p.length!==0||d||i!==0||r;return r=d,i=p.length,A},this.beginShadows=function(){a=!0,l(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(p,d){e=l(p,d,0)},this.setState=function(p,d,A){let h=p.clippingPlanes,m=p.clipIntersection,f=p.clipShadows,R=n.get(p);if(!r||h===null||h.length===0||a&&!f)a?l(null):o();else{let O=a?0:i,H=O*4,b=R.clippingState||null;u.value=b,b=l(h,d,H,A);for(let x=0;x!==H;++x)b[x]=e[x];R.clippingState=b,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=O}};function o(){u.value!==e&&(u.value=e,u.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function l(p,d,A,h){let m=p!==null?p.length:0,f=null;if(m!==0){if(f=u.value,h!==!0||f===null){let R=A+m*4,O=d.matrixWorldInverse;c.getNormalMatrix(O),(f===null||f.length<R)&&(f=new Float32Array(R));for(let H=0,b=A;H!==m;++H,b+=4)s.copy(p[H]).applyMatrix4(O,c),s.normal.toArray(f,b),f[b+3]=s.constant}u.value=f,u.needsUpdate=!0}return t.numPlanes=m,t.numIntersection=0,f}}var _r=class extends Be{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new qr(r),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new pi(5,5,5),a=new fi({name:"CubemapFromEquirect",uniforms:fn(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:je,blending:ln});a.uniforms.tEquirect.value=e;let s=new he(r,a),c=e.minFilter;return e.minFilter===vi&&(e.minFilter=Ue),new Zn(1,10,this).update(t,s),e.minFilter=c,s.geometry.dispose(),s.material.dispose(),this}clear(t,e=!0,i=!0,r=!0){let a=t.getRenderTarget();for(let s=0;s<6;s++)t.setRenderTarget(this,s),t.clear(e,i,r);t.setRenderTarget(a)}},fl=256,Jf=3,Qf=20,zl=256,kl=16,Yf=3,_f=new X,$f=new Gt,Jn=class n{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Zn(1,10,null),this._boxMesh=new he(new pi(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,i=.1,r=100,a={}){let{size:s=256,position:c=_f}=a,u=this._renderer;this._setSize(s);let o=this._allocateTarget(),l=this._getSourceTarget(!0);e>0&&(l.texture.mipmapsAutoUpdate=!1);let p=u.autoClear,d=u.autoClearColor,A=u.autoClearDepth,h=u.autoClearStencil,m=t.background;u.autoClear=!0,u.autoClearColor=!0,u.autoClearDepth=!0,u.autoClearStencil=!0,m===null&&(t.background=u.getClearColor($f));let f=new Zn(i,r,l);return f.position.copy(c),f.update(u,t),u.autoClear=p,u.autoClearColor=d,u.autoClearDepth=A,u.autoClearStencil=h,t.background=m,e>0&&(l.texture.mipmapsAutoUpdate=!0,this._blur(o,e)),this._applyPMREM(o),o}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Il(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(fl,al(t))}_fromTexture(t,e){t.mapping===An||t.mapping===Gn?this._setSize(t.image.length===0?fl:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);let i=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(i),i}_allocateTarget(){let t=this._cubeSize,e=Rl(t,!1,!1),i=Math.log2(t)-Jf;for(let r=0;r<=i;r++)e.texture.mipmaps.push({width:t>>r,height:t>>r});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){let e=this._cubeSize,i=this._sourceTarget;return(i===null||i.width!==e||t&&i.depthBuffer===!1)&&(i!==null&&i.dispose(),this._sourceTarget=Rl(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,i){let r=this._boxMesh,a=this._cubeCamera;r.material=i,a.renderTarget=t,a.activeMipmapLevel=e;let s=t.width>>e;t.viewport.set(0,0,s,s),a.update(this._renderer,r),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===An||t.mapping===Gn?(this._cubemapMaterial===null&&(this._cubemapMaterial=hl()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Il()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=t0(),this._integrationMaterial=e0());let e=this._cubeSize,i=t.texture.mipmaps.length-1,r=this._ggxMaterial.uniforms;r.envMap.value=this._sourceTarget.texture;let a=this._integrationMaterial.uniforms;a.envMap.value=this._sourceTarget.texture,a.sourceLod.value=Math.log2(e/kl);for(let s=0;s<=i;s++){let c=n.lodToRoughness(s,i);if(s>i-Yf)a.roughness.value=c,this._renderCube(t,s,this._integrationMaterial);else{let u=c>0?Math.log2(e)+.5*Math.log2(6/(zl*Math.pow(c,4)))+.5:0;r.roughness.value=c,r.lodBias.value=u,this._renderCube(t,s,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=i0());let i=this._blurMaterial,r=i.uniforms,a=this._sourceTarget;r.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,r.envMap.value=a.texture,this._renderCube(t,0,i),r.envMap.value=t.texture,this._renderCube(a,0,i)}};function Rl(n,t,e){return new _r(n,{minFilter:vi,generateMipmaps:t,type:ai,colorSpace:ur,depthBuffer:e})}function $r(n,t,e){return new fi({name:n,uniforms:t,vertexShader:Ft.cube_vert,fragmentShader:e,side:je,blending:ln,depthTest:!1,depthWrite:!1})}function t0(){return $r("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${zl}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function e0(){return $r("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:kl}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function i0(){return $r("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Qf}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Il(){return $r("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function hl(){return $r("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function n0(n){let t=new WeakMap,e=new WeakMap,i=null;function r(d,A=!1){return d==null?null:A?s(d):a(d)}function a(d){if(d&&d.isTexture){let A=d.mapping;if(A===As||A===ps)if(t.has(d)){let h=t.get(d).texture;return c(h,d.mapping)}else{let h=d.image;if(h&&h.height>0){let m=new _r(h.height);return m.fromEquirectangularTexture(n,d),t.set(d,m),d.addEventListener("dispose",o),c(m.texture,d.mapping)}else return null}}return d}function s(d){if(d&&d.isTexture&&d.isPMREMTexture!==!0){let A=d.mapping,h=A===As||A===ps,m=A===An||A===Gn;if(h||m){let f=e.get(d),R=f!==void 0?f.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==R)return i===null&&(i=new Jn(n)),f=h?i.fromEquirectangular(d,f):i.fromCubemap(d,f),f.texture.pmremVersion=d.pmremVersion,e.set(d,f),f.texture;if(f!==void 0)return f.texture;{let O=d.image;return h&&O&&O.height>0||m&&O&&u(O)?(i===null&&(i=new Jn(n)),f=h?i.fromEquirectangular(d):i.fromCubemap(d),f.texture.pmremVersion=d.pmremVersion,e.set(d,f),d.addEventListener("dispose",l),f.texture):null}}}return d}function c(d,A){return A===As?d.mapping=An:A===ps&&(d.mapping=Gn),d}function u(d){let A=0,h=6;for(let m=0;m<h;m++)d[m]!==void 0&&A++;return A===h}function o(d){let A=d.target;A.removeEventListener("dispose",o);let h=t.get(A);h!==void 0&&(t.delete(A),h.dispose())}function l(d){let A=d.target;A.removeEventListener("dispose",l);let h=e.get(A);h!==void 0&&(e.delete(A),h.dispose())}function p(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:p}}function r0(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let r=n.getExtension(i);return t[i]=r,r}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let r=e(i);return r===null&&an("WebGLRenderer: "+i+" extension not supported."),r}}}function a0(n,t,e,i){let r={},a=new WeakMap,s=new FinalizationRegistry(h=>delete r[h]);function c(h){u(h.target)}function u(h){h.index!==null&&t.remove(h.index);for(let f in h.attributes)t.remove(h.attributes[f]);h.removeEventListener("dispose",c),delete r[h.id],s.unregister(h);let m=a.get(h);m&&(t.remove(m),a.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function o(h,m){return r[m.id]!==void 0||(m.addEventListener("dispose",c),r[m.id]=new WeakRef(m),s.register(m,m.id,m),e.memory.geometries++),m}function l(h){let m=h.attributes;for(let f in m)t.update(m[f],n.ARRAY_BUFFER)}function p(h){let m=h.index,f=h.attributes.position,R=0;if(f===void 0)return;let O=m!==null?m.array.length:f.array.length/3-1,H=f.count>=65535?fr:pr,b=new H(Math.ceil(O/3)*6,1),x=b.array;if(m!==null){let I=m.array;R=m.version;for(let y=0,L=0;y<O;y+=3){let j=I[y+0],N=I[y+1],z=I[y+2];x[L++]=j,x[L++]=N,x[L++]=N,x[L++]=z,x[L++]=z,x[L++]=j}}else{R=f.version;for(let I=0,y=0;I<O;I+=3){let L=I+0,j=I+1,N=I+2;x[y++]=L,x[y++]=j,x[y++]=j,x[y++]=N,x[y++]=N,x[y++]=L}}b.version=R;let P=a.get(h);P&&t.remove(P),a.set(h,b)}function d(h){let m=a.get(h);if(m){let f=h.index;f!==null&&m.version<f.version&&p(h)}else p(h);return a.get(h)}function A(){for(let h in r){let m=r[h].deref();m!==void 0&&u(m)}}return{get:o,update:l,getWireframeAttribute:d,dispose:A}}function s0(n,t,e){let i;function r(p){i=p}let a,s;function c(p){a=p.type,s=p.bytesPerElement}function u(p,d){n.drawElements(i,d,a,p*s),e.update(d,i,1)}function o(p,d,A){A!==0&&(n.drawElementsInstanced(i,d,a,p*s,A),e.update(d,i,A))}function l(p,d,A){if(A===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,a,p,0,A);let m=0;for(let f=0;f<A;f++)m+=d[f];e.update(m,i,1)}this.setMode=r,this.setIndex=c,this.render=u,this.renderInstances=o,this.renderMultiDraw=l}function c0(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,s,c){switch(e.calls++,s){case n.TRIANGLES:e.triangles+=c*(a/3);break;case n.LINES:e.lines+=c*(a/2);break;case n.LINE_STRIP:e.lines+=c*(a-1);break;case n.LINE_LOOP:e.lines+=c*a;break;case n.POINTS:e.points+=c*a;break;default:kt("WebGLInfo: Unknown draw mode:",s);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:i}}function o0(n,t,e){let i=new WeakMap,r=new pe;function a(s,c,u){let o=s.morphTargetInfluences,l=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,p=l!==void 0?l.length:0,d=i.get(c);if(d===void 0||d.count!==p){let L=function(){I.dispose(),i.delete(c),c.removeEventListener("dispose",L)};d!==void 0&&d.texture.dispose();let A=c.morphAttributes.position!==void 0,h=c.morphAttributes.normal!==void 0,m=c.morphAttributes.color!==void 0,f=c.morphAttributes.position||[],R=c.morphAttributes.normal||[],O=c.morphAttributes.color||[],H=0;A===!0&&(H=1),h===!0&&(H=2),m===!0&&(H=3);let b=c.attributes.position.count*H,x=1;b>t.maxTextureSize&&(x=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);let P=new Float32Array(b*x*4*p),I=new dr(P,b,x,p);I.type=Je,I.needsUpdate=!0;let y=H*4;for(let j=0;j<p;j++){let N=f[j],z=R[j],G=O[j],W=b*x*4*j;for(let Z=0;Z<N.count;Z++){let B=Z*y;A===!0&&(r.fromBufferAttribute(N,Z),P[W+B+0]=r.x,P[W+B+1]=r.y,P[W+B+2]=r.z,P[W+B+3]=0),h===!0&&(r.fromBufferAttribute(z,Z),P[W+B+4]=r.x,P[W+B+5]=r.y,P[W+B+6]=r.z,P[W+B+7]=0),m===!0&&(r.fromBufferAttribute(G,Z),P[W+B+8]=r.x,P[W+B+9]=r.y,P[W+B+10]=r.z,P[W+B+11]=G.itemSize===4?r.w:1)}}d={count:p,texture:I,size:new qt(b,x)},i.set(c,d),c.addEventListener("dispose",L)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)u.getUniforms().setValue(n,"morphTexture",s.morphTexture,e);else{let A=0;for(let m=0;m<o.length;m++)A+=o[m];let h=c.morphTargetsRelative?1:1-A;u.getUniforms().setValue(n,"morphTargetBaseInfluence",h),u.getUniforms().setValue(n,"morphTargetInfluences",o)}u.getUniforms().setValue(n,"morphTargetsTexture",d.texture,e),u.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:a}}function u0(n,t,e,i,r){let a=new WeakMap;function s(o){let l=r.render.frame,p=o.geometry,d=t.get(o,p);if(a.get(d)!==l&&(t.update(d),a.set(d,l)),o.isInstancedMesh&&(o.hasEventListener("dispose",u)===!1&&o.addEventListener("dispose",u),a.get(o)!==l&&(e.update(o.instanceMatrix,n.ARRAY_BUFFER),o.instanceColor!==null&&e.update(o.instanceColor,n.ARRAY_BUFFER),a.set(o,l))),o.isSkinnedMesh){let A=o.skeleton;a.get(A)!==l&&(A.update(),a.set(A,l))}return d}function c(){a=new WeakMap}function u(o){let l=o.target;l.removeEventListener("dispose",u),i.releaseStatesOfObject(l),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:s,dispose:c}}var l0={[Qc]:"LINEAR_TONE_MAPPING",[Yc]:"REINHARD_TONE_MAPPING",[_c]:"CINEON_TONE_MAPPING",[$c]:"ACES_FILMIC_TONE_MAPPING",[eo]:"AGX_TONE_MAPPING",[io]:"NEUTRAL_TONE_MAPPING",[to]:"CUSTOM_TONE_MAPPING"};function d0(n,t,e,i,r,a){let s=new Be(t,e,{type:n,depthBuffer:r,stencilBuffer:a,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),c=null,u=null,o=null,l=new ni;l.setAttribute("position",new be([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new be([0,2,0,0,2,0],2));let p=new Ya({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new he(l,p),A=new wr(-1,1,1,-1,0,1),h=null,m=null,f=!1,R,O=null,H=[],b=!1;this.setSize=function(x,P){s.setSize(x,P),c!==null&&c.setSize(x,P),u!==null&&u.setSize(x,P);for(let I=0;I<H.length;I++){let y=H[I];y.setSize&&y.setSize(x,P)}},this.setEffects=function(x){H=x,b=H.length>0&&H[0].isRenderPass===!0;let P=s.width,I=s.height;H.length>0&&c===null&&(c=new Be(P,I,{type:ai,depthBuffer:!1,stencilBuffer:!1}),u=new Be(P,I,{type:ai,depthBuffer:!1,stencilBuffer:!1}));let y=r===!0&&H.some(L=>L.needsDepthTexture===!0);y!==(s.depthTexture!==null)&&(y===!0&&o===null&&(o=new ji(P,I),a===!0&&(o.format=Ti,o.type=pn)),s.dispose(),s.depthTexture=y?o:null,s.resolveDepthBuffer=y,s.storeMultisampledDepthBuffer=y);for(let L=0;L<H.length;L++){let j=H[L];j.setSize&&j.setSize(P,I),y&&j.needsDepthTexture===!0&&j.setDepthTexture&&j.setDepthTexture(o)}},this.begin=function(x,P){if(f||x.toneMapping===hi&&H.length===0)return!1;if(O=P,P!==null){let I=P.width,y=P.height;(s.width!==I||s.height!==y)&&this.setSize(I,y)}return b===!1&&x.setRenderTarget(s),R=x.toneMapping,x.toneMapping=hi,!0},this.hasRenderPass=function(){return b},this.end=function(x,P){x.toneMapping=R,f=!0;let I=s,y=c;for(let L=0;L<H.length;L++){let j=H[L];j.enabled!==!1&&(j.render(x,y,I,P),j.needsSwap!==!1&&(I=y,y=y===c?u:c))}if(h!==x.outputColorSpace||m!==x.toneMapping){h=x.outputColorSpace,m=x.toneMapping,p.defines={},ee.getTransfer(h)===ae&&(p.defines.SRGB_TRANSFER="");let L=l0[m];L&&(p.defines[L]=""),p.needsUpdate=!0}p.uniforms.tDiffuse.value=I.texture,x.setRenderTarget(O),x.render(d,A),O=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){s.dispose(),c!==null&&c.dispose(),u!==null&&u.dispose(),l.dispose(),p.dispose()}}var wl=new ze,Ul=new ji(1,1),Dl=new mr(1),Zl=new dr,Ml=new Za,Bl=new qr,ql=[],Vl=[],ml=new Float32Array(16),bl=new Float32Array(9),yl=new Float32Array(4);function Qn(n,t,e){let i=n[0];if(i<=0||i>0)return n;let r=t*e,a=ql[r];if(a===void 0&&(a=new Float32Array(r),ql[r]=a),t!==0){i.toArray(a,0);for(let s=1,c=0;s!==t;++s)c+=e,n[s].toArray(a,c)}return a}function ye(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Oe(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function ec(n,t){let e=Vl[t];e===void 0&&(e=new Int32Array(t),Vl[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function A0(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function p0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;n.uniform2fv(this.addr,t),Oe(e,t)}}function f0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ye(e,t))return;n.uniform3fv(this.addr,t),Oe(e,t)}}function R0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;n.uniform4fv(this.addr,t),Oe(e,t)}}function I0(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(ye(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Oe(e,t)}else{if(ye(e,i))return;yl.set(i),n.uniformMatrix2fv(this.addr,!1,yl),Oe(e,i)}}function h0(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(ye(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Oe(e,t)}else{if(ye(e,i))return;bl.set(i),n.uniformMatrix3fv(this.addr,!1,bl),Oe(e,i)}}function q0(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(ye(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Oe(e,t)}else{if(ye(e,i))return;ml.set(i),n.uniformMatrix4fv(this.addr,!1,ml),Oe(e,i)}}function V0(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function m0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;n.uniform2iv(this.addr,t),Oe(e,t)}}function b0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ye(e,t))return;n.uniform3iv(this.addr,t),Oe(e,t)}}function y0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;n.uniform4iv(this.addr,t),Oe(e,t)}}function O0(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function S0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;n.uniform2uiv(this.addr,t),Oe(e,t)}}function H0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ye(e,t))return;n.uniform3uiv(this.addr,t),Oe(e,t)}}function P0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;n.uniform4uiv(this.addr,t),Oe(e,t)}}function ic(n){return n.version===0&&(n.compareFunction=po,n.needsUpdate=!0),n}function x0(n,t,e){let i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let a;this.type===n.SAMPLER_2D_SHADOW?a=ic(Ul):a=wl,e.setTexture2D(t||a,r)}function g0(n,t,e){let i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture3D(t||Ml,r)}function W0(n,t,e){let i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let a;this.type===n.SAMPLER_CUBE_SHADOW?a=ic(Dl):a=Bl,e.setTextureCube(t||a,r)}function j0(n,t,e){let i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture2DArray(t||Zl,r)}function v0(n){switch(n){case 5126:return A0;case 35664:return p0;case 35665:return f0;case 35666:return R0;case 35674:return I0;case 35675:return h0;case 35676:return q0;case 5124:case 35670:return V0;case 35667:case 35671:return m0;case 35668:case 35672:return b0;case 35669:case 35673:return y0;case 5125:return O0;case 36294:return S0;case 36295:return H0;case 36296:return P0;case 35678:case 36198:case 36298:case 36306:case 35682:return x0;case 35679:case 36299:case 36307:return g0;case 35680:case 36300:case 36308:case 36293:return W0;case 36289:case 36303:case 36311:case 36292:return j0}}function T0(n,t){n.uniform1fv(this.addr,t)}function N0(n,t){let e=Qn(t,this.size,2);n.uniform2fv(this.addr,e)}function X0(n,t){let e=Qn(t,this.size,3);n.uniform3fv(this.addr,e)}function L0(n,t){let e=Qn(t,this.size,4);n.uniform4fv(this.addr,e)}function E0(n,t){let e=Qn(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function z0(n,t){let e=Qn(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function k0(n,t){let e=Qn(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function w0(n,t){n.uniform1iv(this.addr,t)}function U0(n,t){n.uniform2iv(this.addr,t)}function D0(n,t){n.uniform3iv(this.addr,t)}function Z0(n,t){n.uniform4iv(this.addr,t)}function M0(n,t){n.uniform1uiv(this.addr,t)}function B0(n,t){n.uniform2uiv(this.addr,t)}function G0(n,t){n.uniform3uiv(this.addr,t)}function K0(n,t){n.uniform4uiv(this.addr,t)}function F0(n,t,e){let i=this.cache,r=t.length,a=ec(e,r);ye(i,a)||(n.uniform1iv(this.addr,a),Oe(i,a));let s;this.type===n.SAMPLER_2D_SHADOW?s=ic(Ul):s=wl;for(let c=0;c!==r;++c)e.setTexture2D(t[c]||s,a[c])}function C0(n,t,e){let i=this.cache,r=t.length,a=ec(e,r);ye(i,a)||(n.uniform1iv(this.addr,a),Oe(i,a));for(let s=0;s!==r;++s)e.setTexture3D(t[s]||Ml,a[s])}function J0(n,t,e){let i=this.cache,r=t.length,a=ec(e,r);ye(i,a)||(n.uniform1iv(this.addr,a),Oe(i,a));let s;this.type===n.SAMPLER_CUBE_SHADOW?s=ic(Dl):s=Bl;for(let c=0;c!==r;++c)e.setTextureCube(t[c]||s,a[c])}function Q0(n,t,e){let i=this.cache,r=t.length,a=ec(e,r);ye(i,a)||(n.uniform1iv(this.addr,a),Oe(i,a));for(let s=0;s!==r;++s)e.setTexture2DArray(t[s]||Zl,a[s])}function Y0(n){switch(n){case 5126:return T0;case 35664:return N0;case 35665:return X0;case 35666:return L0;case 35674:return E0;case 35675:return z0;case 35676:return k0;case 5124:case 35670:return w0;case 35667:case 35671:return U0;case 35668:case 35672:return D0;case 35669:case 35673:return Z0;case 5125:return M0;case 36294:return B0;case 36295:return G0;case 36296:return K0;case 35678:case 36198:case 36298:case 36306:case 35682:return F0;case 35679:case 36299:case 36307:return C0;case 35680:case 36300:case 36308:case 36293:return J0;case 36289:case 36303:case 36311:case 36292:return Q0}}var So=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=v0(e.type)}},Ho=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Y0(e.type)}},Po=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let r=this.seq;for(let a=0,s=r.length;a!==s;++a){let c=r[a];c.setValue(t,e[c.id],i)}}},yo=/(\w+)(\])?(\[|\.)?/g;function Ol(n,t){n.seq.push(t),n.map[t.id]=t}function _0(n,t,e){let i=n.name,r=i.length;for(yo.lastIndex=0;;){let a=yo.exec(i),s=yo.lastIndex,c=a[1],u=a[2]==="]",o=a[3];if(u&&(c=c|0),o===void 0||o==="["&&s+2===r){Ol(e,o===void 0?new So(c,n,t):new Ho(c,n,t));break}else{let p=e.map[c];p===void 0&&(p=new Po(c),Ol(e,p)),e=p}}}var Cn=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let c=t.getActiveUniform(e,s),u=t.getUniformLocation(e,c.name);_0(c,u,this)}let r=[],a=[];for(let s of this.seq)s.type===t.SAMPLER_2D_SHADOW||s.type===t.SAMPLER_CUBE_SHADOW||s.type===t.SAMPLER_2D_ARRAY_SHADOW?r.push(s):a.push(s);r.length>0&&(this.seq=r.concat(a))}setValue(t,e,i,r){let a=this.map[e];a!==void 0&&a.setValue(t,i,r)}setOptional(t,e,i){let r=e[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,e,i,r){for(let a=0,s=e.length;a!==s;++a){let c=e[a],u=i[c.id];u.needsUpdate!==!1&&c.setValue(t,u.value,r)}}static seqWithValue(t,e){let i=[];for(let r=0,a=t.length;r!==a;++r){let s=t[r];s.id in e&&i.push(s)}return i}};function Sl(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var $0=37297,t1=0;function e1(n,t){let e=n.split(`
`),i=[],r=Math.max(t-6,0),a=Math.min(t+6,e.length);for(let s=r;s<a;s++){let c=s+1;i.push(`${c===t?">":" "} ${c}: ${e[s]}`)}return i.join(`
`)}var Hl=new Dt;function i1(n){ee._getMatrix(Hl,ee.workingColorSpace,n);let t=`mat3( ${Hl.elements.map(e=>e.toFixed(4))} )`;switch(ee.getTransfer(n)){case lr:return[t,"LinearTransferOETF"];case ae:return[t,"sRGBTransferOETF"];default:return zt("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Pl(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),a=(n.getShaderInfoLog(t)||"").trim();if(i&&a==="")return"";let s=/ERROR: 0:(\d+)/.exec(a);if(s){let c=parseInt(s[1]);return e.toUpperCase()+`

`+a+`

`+e1(n.getShaderSource(t),c)}else return a}function n1(n,t){let e=i1(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var r1={[Qc]:"Linear",[Yc]:"Reinhard",[_c]:"Cineon",[$c]:"ACESFilmic",[eo]:"AgX",[io]:"Neutral",[to]:"Custom"};function a1(n,t){let e=r1[t];return e===void 0?(zt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var $s=new X;function s1(){ee.getLuminanceCoefficients($s);let n=$s.x.toFixed(4),t=$s.y.toFixed(4),e=$s.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function c1(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Yr).join(`
`)}function o1(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function u1(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let a=n.getActiveAttrib(t,r),s=a.name,c=1;a.type===n.FLOAT_MAT2&&(c=2),a.type===n.FLOAT_MAT3&&(c=3),a.type===n.FLOAT_MAT4&&(c=4),e[s]={type:a.type,location:n.getAttribLocation(t,s),locationSize:c}}return e}function Yr(n){return n!==""}function xl(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function gl(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var l1=/^[ \t]*#include +<([\w\d./]+)>/gm;function xo(n){return n.replace(l1,d1)}function d1(n,t){let e=Ft[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return xo(e)}var A1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Wl(n){return n.replace(A1,p1)}function p1(n,t,e,i){let r="";for(let a=parseInt(t);a<parseInt(e);a++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function jl(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var f1={[Dr]:"SHADOWMAP_TYPE_PCF",[Mn]:"SHADOWMAP_TYPE_VSM"};function R1(n){return f1[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var I1={[Gn]:"ENVMAP_MODE_REFRACTION"};function h1(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":I1[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var q1={[ds]:"ENVMAP_BLENDING_MULTIPLY",[Mu]:"ENVMAP_BLENDING_MIX",[Bu]:"ENVMAP_BLENDING_ADD"};function V1(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":q1[n.combine]||"ENVMAP_BLENDING_NONE"}function m1(n,t,e,i){let r=n.getContext(),a=e.defines,s=e.vertexShader,c=e.fragmentShader,u=R1(e),o=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",l=h1(e),p=V1(e),d=c1(e),A=o1(a),h=r.createProgram(),m,f,R=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,A].filter(Yr).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,A].filter(Yr).join(`
`),f.length>0&&(f+=`
`)):(m=[jl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,A,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+u:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Yr).join(`
`),f=[jl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,A,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+o:"",e.envMap?"#define "+l:"",e.envMap?"#define "+p:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+u:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==hi?"#define TONE_MAPPING":"",e.toneMapping!==hi?Ft.tonemapping_pars_fragment:"",e.toneMapping!==hi?a1("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ft.colorspace_pars_fragment,n1("linearToOutputTexel",e.outputColorSpace),s1(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Yr).join(`
`)),s=xo(s),s=xl(s,e),s=gl(s,e),c=xo(c),c=xl(c,e),c=gl(c,e),s=Wl(s),c=Wl(c),e.isRawShaderMaterial!==!0&&(R=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===fo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===fo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let O=R+m+s,H=R+f+c,b=Sl(r,r.VERTEX_SHADER,O),x=Sl(r,r.FRAGMENT_SHADER,H);r.attachShader(h,b),r.attachShader(h,x),e.index0AttributeName!==void 0?r.bindAttribLocation(h,0,e.index0AttributeName):e.hasPositionAttribute===!0&&r.bindAttribLocation(h,0,"position"),r.linkProgram(h);function P(j){if(n.debug.checkShaderErrors){let N=r.getProgramInfoLog(h)||"",z=r.getShaderInfoLog(b)||"",G=r.getShaderInfoLog(x)||"",W=N.trim(),Z=z.trim(),B=G.trim(),E=!0,et=!0;if(r.getProgramParameter(h,r.LINK_STATUS)===!1)if(E=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,h,b,x);else{let D=Pl(r,b,"vertex"),J=Pl(r,x,"fragment");kt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(h,r.VALIDATE_STATUS)+`

Material Name: `+j.name+`
Material Type: `+j.type+`

Program Info Log: `+W+`
`+D+`
`+J)}else W!==""?zt("WebGLProgram: Program Info Log:",W):(Z===""||B==="")&&(et=!1);et&&(j.diagnostics={runnable:E,programLog:W,vertexShader:{log:Z,prefix:m},fragmentShader:{log:B,prefix:f}})}r.deleteShader(b),r.deleteShader(x),I=new Cn(r,h),y=u1(r,h)}let I;this.getUniforms=function(){return I===void 0&&P(this),I};let y;this.getAttributes=function(){return y===void 0&&P(this),y};let L=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=r.getProgramParameter(h,$0)),L},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(h),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=t1++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=b,this.fragmentShader=x,this}var b1=0,go=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){let r=this._getShaderCacheForMaterial(t);return r.has(e)===!1&&(r.add(e),e.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new Wo(t),e.set(t,i)),i}},Wo=class{constructor(t){this.id=b1++,this.code=t,this.usedTimes=0}};function y1(n){return n===Ji||n===Fr||n===Cr}function O1(n,t,e,i,r,a){let s=new Ar,c=new go,u=new Set,o=[],l=new Map,p=i.logarithmicDepthBuffer,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function A(I){return u.add(I),I===0?"uv":`uv${I}`}function h(I,y,L,j,N,z){let G=j.fog,W=N.geometry,Z=I.isMeshStandardMaterial||I.isMeshLambertMaterial||I.isMeshPhongMaterial?j.environment:null,B=I.isMeshStandardMaterial||I.isMeshLambertMaterial&&!I.envMap||I.isMeshPhongMaterial&&!I.envMap,E=t.get(I.envMap||Z,B),et=d[I.type],D=i.precision;I.precision!==null&&(D=i.getMaxPrecision(I.precision),D!==I.precision&&zt("WebGLProgram.getParameters:",I.precision,"not supported, using",D,"instead."));let J=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,_=J!==void 0?J.length:0,Vt=0;W.morphAttributes.position!==void 0&&(Vt=1),W.morphAttributes.normal!==void 0&&(Vt=2),W.morphAttributes.color!==void 0&&(Vt=3);let Wt,F,ht,St;if(et){let mt=Vi[et];Wt=mt.vertexShader,F=mt.fragmentShader}else{Wt=I.vertexShader,F=I.fragmentShader;let mt=c.getVertexShaderStage(I),se=c.getFragmentShaderStage(I);c.update(I,mt,se),ht=mt.id,St=se.id}let vt=n.getRenderTarget(),pt=n.state.buffers.depth.getReversed(),Nt=N.isInstancedMesh===!0,oe=N.isBatchedMesh===!0,Xt=!!I.map,Zt=!!I.matcap,Ct=!!E,tt=Ct&&E.isPMREMTexture===!0,st=!!I.aoMap,at=!!I.lightMap,yt=!!I.bumpMap&&I.wireframe===!1,ut=!!I.normalMap,wt=!!I.displacementMap,gt=!!I.emissiveMap,Jt=!!I.metalnessMap,_t=!!I.roughnessMap,ne=I.anisotropy>0,T=I.clearcoat>0,qe=I.diffuseRoughness>0,Qt=I.dispersion>0,ue=I.retroreflectivity>0,ft=I.iridescence>0,Ie=I.sheen>0,Et=I.transmission>0,Ut=ne&&!!I.anisotropyMap,S=T&&!!I.clearcoatMap,q=T&&!!I.clearcoatNormalMap,w=T&&!!I.clearcoatRoughnessMap,it=qe&&!!I.diffuseRoughnessMap,$=ft&&!!I.iridescenceMap,ct=ft&&!!I.iridescenceThicknessMap,Rt=Ie&&!!I.sheenColorMap,C=Ie&&!!I.sheenRoughnessMap,Q=!!I.specularMap,lt=!!I.specularColorMap,g=!!I.specularIntensityMap,Y=Et&&!!I.transmissionMap,K=Et&&!!I.thicknessMap,dt=!!I.gradientMap,rt=!!I.alphaMap,ot=I.alphaTest>0,Tt=!!I.alphaHash,Kt=!!I.extensions,nt=hi;I.toneMapped&&(vt===null||vt.isXRRenderTarget===!0)&&(nt=n.toneMapping);let Lt=tt?E.isCompressedCubeTexture?E.image[0].mipmaps:E.mipmaps:null,Bt={shaderID:et,shaderType:I.type,shaderName:I.name,vertexShader:Wt,fragmentShader:F,defines:I.defines,customVertexShaderID:ht,customFragmentShaderID:St,isRawShaderMaterial:I.isRawShaderMaterial===!0,glslVersion:I.glslVersion,precision:D,batching:oe,batchingColor:oe&&N._colorsTexture!==null,instancing:Nt,instancingColor:Nt&&N.instanceColor!==null,instancingMorph:Nt&&N.morphTexture!==null,outputColorSpace:vt===null?n.outputColorSpace:vt.isXRRenderTarget===!0?vt.texture.colorSpace:ee.workingColorSpace,alphaToCoverage:!!I.alphaToCoverage,map:Xt,matcap:Zt,envMap:Ct,envMapMode:Ct&&E.mapping,envMapPMREM:tt,envMapMaxLod:tt?Lt.length-1:null,envMapSize:tt?Lt[0].width:null,aoMap:st,lightMap:at,bumpMap:yt,normalMap:ut,displacementMap:wt,emissiveMap:gt,normalMapObjectSpace:ut&&I.normalMapType===Fu,normalMapTangentSpace:ut&&I.normalMapType===Jr,packedNormalMap:ut&&I.normalMapType===Jr&&y1(I.normalMap.format),metalnessMap:Jt,roughnessMap:_t,anisotropy:ne,anisotropyMap:Ut,clearcoat:T,clearcoatMap:S,clearcoatNormalMap:q,clearcoatRoughnessMap:w,diffuseRoughness:qe,diffuseRoughnessMap:it,dispersion:Qt,retroreflection:ue,iridescence:ft,iridescenceMap:$,iridescenceThicknessMap:ct,sheen:Ie,sheenColorMap:Rt,sheenRoughnessMap:C,specularMap:Q,specularColorMap:lt,specularIntensityMap:g,transmission:Et,transmissionMap:Y,thicknessMap:K,gradientMap:dt,opaque:I.transparent===!1&&I.blending===Bn&&I.alphaToCoverage===!1,alphaMap:rt,alphaTest:ot,alphaHash:Tt,combine:I.combine,mapUv:Xt&&A(I.map.channel),aoMapUv:st&&A(I.aoMap.channel),lightMapUv:at&&A(I.lightMap.channel),bumpMapUv:yt&&A(I.bumpMap.channel),normalMapUv:ut&&A(I.normalMap.channel),displacementMapUv:wt&&A(I.displacementMap.channel),emissiveMapUv:gt&&A(I.emissiveMap.channel),metalnessMapUv:Jt&&A(I.metalnessMap.channel),roughnessMapUv:_t&&A(I.roughnessMap.channel),anisotropyMapUv:Ut&&A(I.anisotropyMap.channel),clearcoatMapUv:S&&A(I.clearcoatMap.channel),clearcoatNormalMapUv:q&&A(I.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:w&&A(I.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:it&&A(I.diffuseRoughnessMap.channel),iridescenceMapUv:$&&A(I.iridescenceMap.channel),iridescenceThicknessMapUv:ct&&A(I.iridescenceThicknessMap.channel),sheenColorMapUv:Rt&&A(I.sheenColorMap.channel),sheenRoughnessMapUv:C&&A(I.sheenRoughnessMap.channel),specularMapUv:Q&&A(I.specularMap.channel),specularColorMapUv:lt&&A(I.specularColorMap.channel),specularIntensityMapUv:g&&A(I.specularIntensityMap.channel),transmissionMapUv:Y&&A(I.transmissionMap.channel),thicknessMapUv:K&&A(I.thicknessMap.channel),alphaMapUv:rt&&A(I.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(ut||ne),vertexNormals:!!W.attributes.normal,vertexColors:I.vertexColors,vertexAlphas:I.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!W.attributes.uv&&(Xt||rt),fog:!!G,useFog:I.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:I.wireframe===!1&&(I.flatShading===!0||W.attributes.normal===void 0&&ut===!1&&(I.isMeshLambertMaterial||I.isMeshPhongMaterial||I.isMeshStandardMaterial||I.isMeshPhysicalMaterial)),sizeAttenuation:I.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:pt,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:W.attributes.position!==void 0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:_,morphTextureStride:Vt,numSunLights:y.sun.length,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numSunLightShadows:y.sunShadowMap.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numLightProbeGrids:z.filter(mt=>mt.texture!==null).length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:I.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:nt,decodeVideoTexture:Xt&&I.map.isVideoTexture===!0&&ee.getTransfer(I.map.colorSpace)===ae,decodeVideoTextureEmissive:gt&&I.emissiveMap.isVideoTexture===!0&&ee.getTransfer(I.emissiveMap.colorSpace)===ae,premultipliedAlpha:I.premultipliedAlpha,doubleSided:I.side===Ii,flipSided:I.side===je,useDepthPacking:I.depthPacking>=0,depthPacking:I.depthPacking||0,index0AttributeName:I.index0AttributeName,extensionClipCullDistance:Kt&&I.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Kt&&I.extensions.multiDraw===!0||oe)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:I.customProgramCacheKey()};return Bt.vertexUv1s=u.has(1),Bt.vertexUv2s=u.has(2),Bt.vertexUv3s=u.has(3),u.clear(),Bt}function m(I){let y=[];if(I.shaderID?y.push(I.shaderID):(y.push(I.customVertexShaderID),y.push(I.customFragmentShaderID)),I.defines!==void 0)for(let L in I.defines)y.push(L),y.push(I.defines[L]);return I.isRawShaderMaterial===!1&&(f(y,I),R(y,I),y.push(n.outputColorSpace)),y.push(I.customProgramCacheKey),y.join()}function f(I,y){I.push(y.precision),I.push(y.outputColorSpace),I.push(y.envMapMode),I.push(y.envMapPMREM),I.push(y.envMapMaxLod),I.push(y.envMapSize),I.push(y.mapUv),I.push(y.alphaMapUv),I.push(y.lightMapUv),I.push(y.aoMapUv),I.push(y.bumpMapUv),I.push(y.normalMapUv),I.push(y.displacementMapUv),I.push(y.emissiveMapUv),I.push(y.metalnessMapUv),I.push(y.roughnessMapUv),I.push(y.anisotropyMapUv),I.push(y.clearcoatMapUv),I.push(y.clearcoatNormalMapUv),I.push(y.clearcoatRoughnessMapUv),I.push(y.diffuseRoughnessMapUv),I.push(y.iridescenceMapUv),I.push(y.iridescenceThicknessMapUv),I.push(y.sheenColorMapUv),I.push(y.sheenRoughnessMapUv),I.push(y.specularMapUv),I.push(y.specularColorMapUv),I.push(y.specularIntensityMapUv),I.push(y.transmissionMapUv),I.push(y.thicknessMapUv),I.push(y.combine),I.push(y.fogExp2),I.push(y.sizeAttenuation),I.push(y.morphTargetsCount),I.push(y.numSunLights),I.push(y.numDirLights),I.push(y.numPointLights),I.push(y.numSpotLights),I.push(y.numSpotLightMaps),I.push(y.numHemiLights),I.push(y.numRectAreaLights),I.push(y.numSunLightShadows),I.push(y.numDirLightShadows),I.push(y.numPointLightShadows),I.push(y.numSpotLightShadows),I.push(y.numSpotLightShadowsWithMaps),I.push(y.numLightProbes),I.push(y.numLightProbeGrids),I.push(y.shadowMapType),I.push(y.toneMapping),I.push(y.numClippingPlanes),I.push(y.numClipIntersection),I.push(y.depthPacking)}function R(I,y){s.disableAll(),y.instancing&&s.enable(0),y.instancingColor&&s.enable(1),y.instancingMorph&&s.enable(2),y.matcap&&s.enable(3),y.envMap&&s.enable(4),y.normalMapObjectSpace&&s.enable(5),y.normalMapTangentSpace&&s.enable(6),y.clearcoat&&s.enable(7),y.iridescence&&s.enable(8),y.alphaTest&&s.enable(9),y.vertexColors&&s.enable(10),y.vertexAlphas&&s.enable(11),y.vertexUv1s&&s.enable(12),y.vertexUv2s&&s.enable(13),y.vertexUv3s&&s.enable(14),y.vertexTangents&&s.enable(15),y.anisotropy&&s.enable(16),y.alphaHash&&s.enable(17),y.batching&&s.enable(18),y.dispersion&&s.enable(19),y.retroreflection&&s.enable(24),y.diffuseRoughness&&s.enable(25),y.batchingColor&&s.enable(20),y.gradientMap&&s.enable(21),y.packedNormalMap&&s.enable(22),y.vertexNormals&&s.enable(23),I.push(s.mask),s.disableAll(),y.fog&&s.enable(0),y.useFog&&s.enable(1),y.flatShading&&s.enable(2),y.logarithmicDepthBuffer&&s.enable(3),y.reversedDepthBuffer&&s.enable(4),y.skinning&&s.enable(5),y.morphTargets&&s.enable(6),y.morphNormals&&s.enable(7),y.morphColors&&s.enable(8),y.premultipliedAlpha&&s.enable(9),y.shadowMapEnabled&&s.enable(10),y.doubleSided&&s.enable(11),y.flipSided&&s.enable(12),y.useDepthPacking&&s.enable(13),y.dithering&&s.enable(14),y.transmission&&s.enable(15),y.sheen&&s.enable(16),y.opaque&&s.enable(17),y.pointsUvs&&s.enable(18),y.decodeVideoTexture&&s.enable(19),y.decodeVideoTextureEmissive&&s.enable(20),y.alphaToCoverage&&s.enable(21),y.numLightProbeGrids>0&&s.enable(22),y.hasPositionAttribute&&s.enable(23),I.push(s.mask)}function O(I){let y=d[I.type],L;if(y){let j=Vi[y];L=dl.clone(j.uniforms)}else L=I.uniforms;return L}function H(I,y){let L=l.get(y);return L!==void 0?++L.usedTimes:(L=new m1(n,y,I,r),o.push(L),l.set(y,L)),L}function b(I){if(--I.usedTimes===0){let y=o.indexOf(I);o[y]=o[o.length-1],o.pop(),l.delete(I.cacheKey),I.destroy()}}function x(I){c.remove(I)}function P(){c.dispose()}return{getParameters:h,getProgramCacheKey:m,getUniforms:O,acquireProgram:H,releaseProgram:b,releaseShaderCache:x,programs:o,dispose:P}}function S1(){let n=new WeakMap;function t(s){return n.has(s)}function e(s){let c=n.get(s);return c===void 0&&(c={},n.set(s,c)),c}function i(s){n.delete(s)}function r(s,c,u){n.get(s)[c]=u}function a(){n=new WeakMap}return{has:t,get:e,remove:i,update:r,dispose:a}}function H1(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function vl(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Tl(){let n=[],t=0,e=[],i=[],r=[];function a(){t=0,e.length=0,i.length=0,r.length=0}function s(d){let A=0;return d.isInstancedMesh&&(A+=2),d.isSkinnedMesh&&(A+=1),A}function c(d,A,h,m,f,R){let O=n[t];return O===void 0?(O={id:d.id,object:d,geometry:A,material:h,materialVariant:s(d),groupOrder:m,renderOrder:d.renderOrder,z:f,group:R},n[t]=O):(O.id=d.id,O.object=d,O.geometry=A,O.material=h,O.materialVariant=s(d),O.groupOrder=m,O.renderOrder=d.renderOrder,O.z=f,O.group=R),t++,O}function u(d,A,h,m,f,R,O){O.reversedDepth===!0&&(f=-f);let H=c(d,A,h,m,f,R);h.transmission>0?i.push(H):h.transparent===!0?r.push(H):e.push(H)}function o(d,A,h,m,f,R){let O=c(d,A,h,m,f,R);h.transmission>0?i.unshift(O):h.transparent===!0?r.unshift(O):e.unshift(O)}function l(d,A){e.length>1&&e.sort(d||H1),i.length>1&&i.sort(A||vl),r.length>1&&r.sort(A||vl)}function p(){for(let d=t,A=n.length;d<A;d++){let h=n[d];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:e,transmissive:i,transparent:r,init:a,push:u,unshift:o,finish:p,sort:l}}function P1(){let n=new WeakMap;function t(i,r){let a=n.get(i),s;return a===void 0?(s=new Tl,n.set(i,[s])):r>=a.length?(s=new Tl,a.push(s)):s=a[r],s}function e(){n=new WeakMap}return{get:t,dispose:e}}function x1(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new X,color:new Gt};break;case"SpotLight":e={position:new X,direction:new X,color:new Gt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new X,color:new Gt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new X,skyColor:new Gt,groundColor:new Gt};break;case"RectAreaLight":e={color:new Gt,position:new X,halfWidth:new X,halfHeight:new X};break}return n[t.id]=e,e}}}function g1(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var W1=0;function j1(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function v1(n){let t=new x1,e=g1(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)i.probe.push(new X);let r=new X,a=new ce,s=new ce;function c(o){let l=0,p=0,d=0;for(let z=0;z<9;z++)i.probe[z].set(0,0,0);let A=0,h=0,m=0,f=0,R=0,O=0,H=0,b=0,x=0,P=0,I=0,y=0,L=0,j=0;o.sort(j1);for(let z=0,G=o.length;z<G;z++){let W=o[z],Z=W.color,B=W.intensity,E=W.distance,et=null;if(W.shadow&&W.shadow.map&&(W.shadow.map.texture.format===Ji?et=W.shadow.map.texture:et=W.shadow.map.depthTexture||W.shadow.map.texture),W.isAmbientLight)l+=Z.r*B,p+=Z.g*B,d+=Z.b*B;else if(W.isLightProbe){for(let D=0;D<9;D++)i.probe[D].addScaledVector(W.sh.coefficients[D],B);j++}else if(W.isSunLight){let D=t.get(W);if(D.color.copy(W.color).multiplyScalar(W.intensity),W.castShadow){let J=W.shadow,_=e.get(W);_.shadowIntensity=J.intensity,_.shadowBias=J.bias,_.shadowNormalBias=J.normalBias,_.shadowRadius=J.radius,_.shadowMapSize.copy(J.mapSize).multiply(J.getFrameExtents()),i.sunShadow[h]=_,i.sunShadowMap[h]=et;let Vt=J.getViewportCount();for(let Wt=0;Wt<Vt;Wt++)i.sunShadowMatrix[m+Wt]=J.getMatrix(Wt),i.sunShadowCascade[m+Wt]=J._cascadeData[Wt];m+=Vt,h++}i.sun[A]=D,A++}else if(W.isDirectionalLight){let D=t.get(W);if(D.color.copy(W.color).multiplyScalar(W.intensity),W.castShadow){let J=W.shadow,_=e.get(W);_.shadowIntensity=J.intensity,_.shadowBias=J.bias,_.shadowNormalBias=J.normalBias,_.shadowRadius=J.radius,_.shadowMapSize=J.mapSize,i.directionalShadow[f]=_,i.directionalShadowMap[f]=et,i.directionalShadowMatrix[f]=W.shadow.matrix,x++}i.directional[f]=D,f++}else if(W.isSpotLight){let D=t.get(W);D.position.setFromMatrixPosition(W.matrixWorld),D.color.copy(Z).multiplyScalar(B),D.distance=E,D.coneCos=Math.cos(W.angle),D.penumbraCos=Math.cos(W.angle*(1-W.penumbra)),D.decay=W.decay,i.spot[O]=D;let J=W.shadow;if(W.map&&(i.spotLightMap[y]=W.map,y++,J.updateMatrices(W),W.castShadow&&L++),i.spotLightMatrix[O]=J.matrix,W.castShadow){let _=e.get(W);_.shadowIntensity=J.intensity,_.shadowBias=J.bias,_.shadowNormalBias=J.normalBias,_.shadowRadius=J.radius,_.shadowMapSize=J.mapSize,i.spotShadow[O]=_,i.spotShadowMap[O]=et,I++}O++}else if(W.isRectAreaLight){let D=t.get(W);D.color.copy(Z).multiplyScalar(B),D.halfWidth.set(W.width*.5,0,0),D.halfHeight.set(0,W.height*.5,0),i.rectArea[H]=D,H++}else if(W.isPointLight){let D=t.get(W);if(D.color.copy(W.color).multiplyScalar(W.intensity),D.distance=W.distance,D.decay=W.decay,W.castShadow){let J=W.shadow,_=e.get(W);_.shadowIntensity=J.intensity,_.shadowBias=J.bias,_.shadowNormalBias=J.normalBias,_.shadowRadius=J.radius,_.shadowMapSize=J.mapSize,_.shadowCameraNear=J.camera.near,_.shadowCameraFar=J.camera.far,i.pointShadow[R]=_,i.pointShadowMap[R]=et,i.pointShadowMatrix[R]=W.shadow.matrix,P++}i.point[R]=D,R++}else if(W.isHemisphereLight){let D=t.get(W);D.skyColor.copy(W.color).multiplyScalar(B),D.groundColor.copy(W.groundColor).multiplyScalar(B),i.hemi[b]=D,b++}}H>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=bt.LTC_FLOAT_1,i.rectAreaLTC2=bt.LTC_FLOAT_2):(i.rectAreaLTC1=bt.LTC_HALF_1,i.rectAreaLTC2=bt.LTC_HALF_2)),i.ambient[0]=l,i.ambient[1]=p,i.ambient[2]=d;let N=i.hash;(N.sunLength!==A||N.directionalLength!==f||N.pointLength!==R||N.spotLength!==O||N.rectAreaLength!==H||N.hemiLength!==b||N.numSunShadows!==h||N.numDirectionalShadows!==x||N.numPointShadows!==P||N.numSpotShadows!==I||N.numSpotMaps!==y||N.numLightProbes!==j)&&(i.sun.length=A,i.directional.length=f,i.spot.length=O,i.rectArea.length=H,i.point.length=R,i.hemi.length=b,i.sunShadow.length=h,i.sunShadowMap.length=h,i.sunShadowMatrix.length=m,i.sunShadowCascade.length=m,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.directionalShadowMatrix.length=x,i.pointShadow.length=P,i.pointShadowMap.length=P,i.pointShadowMatrix.length=P,i.spotShadow.length=I,i.spotShadowMap.length=I,i.spotLightMatrix.length=I+y-L,i.spotLightMap.length=y,i.numSpotLightShadowsWithMaps=L,i.numLightProbes=j,N.sunLength=A,N.directionalLength=f,N.pointLength=R,N.spotLength=O,N.rectAreaLength=H,N.hemiLength=b,N.numSunShadows=h,N.numDirectionalShadows=x,N.numPointShadows=P,N.numSpotShadows=I,N.numSpotMaps=y,N.numLightProbes=j,i.version=W1++)}function u(o,l){let p=0,d=0,A=0,h=0,m=0,f=0,R=l.matrixWorldInverse;for(let O=0,H=o.length;O<H;O++){let b=o[O];if(b.isSunLight){let x=i.sun[p];x.direction.setFromMatrixPosition(b.matrixWorld),x.direction.transformDirection(R),p++}else if(b.isDirectionalLight){let x=i.directional[d];x.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(R),d++}else if(b.isSpotLight){let x=i.spot[h];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(R),x.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(R),h++}else if(b.isRectAreaLight){let x=i.rectArea[m];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(R),s.identity(),a.copy(b.matrixWorld),a.premultiply(R),s.extractRotation(a),x.halfWidth.set(b.width*.5,0,0),x.halfHeight.set(0,b.height*.5,0),x.halfWidth.applyMatrix4(s),x.halfHeight.applyMatrix4(s),m++}else if(b.isPointLight){let x=i.point[A];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(R),A++}else if(b.isHemisphereLight){let x=i.hemi[f];x.direction.setFromMatrixPosition(b.matrixWorld),x.direction.transformDirection(R),f++}}}return{setup:c,setupView:u,state:i}}function Nl(n){let t=new v1(n),e=[],i=[],r=[];function a(p){l.camera=p,e.length=0,i.length=0,r.length=0}function s(p){p.isLightProbeGrid?r.push(p):e.push(p)}function c(p){i.push(p)}function u(){t.setup(e),r.sort((p,d)=>p.priority-d.priority||p.id-d.id)}function o(p){t.setupView(e,p)}let l={lightsArray:e,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:l,setupLights:u,setupLightsView:o,pushLight:s,pushShadow:c}}function T1(n){let t=new WeakMap;function e(r,a=0){let s=t.get(r),c;return s===void 0?(c=new Nl(n),t.set(r,[c])):a>=s.length?(c=new Nl(n),s.push(c)):c=s[a],c}function i(){t=new WeakMap}return{get:e,dispose:i}}var N1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,X1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,L1=[new X(1,0,0),new X(-1,0,0),new X(0,1,0),new X(0,-1,0),new X(0,0,1),new X(0,0,-1)],E1=[new X(0,-1,0),new X(0,-1,0),new X(0,0,1),new X(0,0,-1),new X(0,-1,0),new X(0,-1,0)],Xl=new ce,Qr=new X,Oo=new X;function z1(n,t,e){let i=new Mi,r=new qt,a=new qt,s=new pe,c=new _a,u=new $a,o={},l=e.maxTextureSize,p={[Ci]:je,[je]:Ci,[Ii]:Ii},d=new fi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new qt},radius:{value:4}},vertexShader:N1,fragmentShader:X1}),A=d.clone();A.defines.HORIZONTAL_PASS=1;let h=new ni;h.setAttribute("position",new ii(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let m=new he(h,d),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Dr;let R=this.type;this.render=function(P,I,y){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||P.length===0)return;this.type===Su&&(zt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Dr);let L=n.getRenderTarget(),j=n.getActiveCubeFace(),N=n.getActiveMipmapLevel(),z=n.state;z.setBlending(ln),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);let G=R!==this.type;G&&I.traverse(function(W){W.material&&(Array.isArray(W.material)?W.material.forEach(Z=>Z.needsUpdate=!0):W.material.needsUpdate=!0)});for(let W=0,Z=P.length;W<Z;W++){let B=P[W],E=B.shadow;if(E===void 0){zt("WebGLShadowMap:",B,"has no shadow.");continue}if(E.autoUpdate===!1&&E.needsUpdate===!1)continue;r.copy(E.mapSize);let et=E.getFrameExtents();r.multiply(et),a.copy(E.mapSize),(r.x>l||r.y>l)&&(r.x>l&&(a.x=Math.floor(l/et.x),r.x=a.x*et.x,E.mapSize.x=a.x),r.y>l&&(a.y=Math.floor(l/et.y),r.y=a.y*et.y,E.mapSize.y=a.y));let D=n.state.buffers.depth.getReversed();if(E.camera._reversedDepth=D,E.map===null||G===!0){if(E.map!==null&&(E.map.depthTexture!==null&&(E.map.depthTexture.dispose(),E.map.depthTexture=null),E.map.dispose()),this.type===Mn){if(B.isPointLight){zt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}E.map=new Be(r.x,r.y,{format:Ji,type:ai,minFilter:Ue,magFilter:Ue,generateMipmaps:!1}),E.map.texture.name=B.name+".shadowMap",E.map.depthTexture=new ji(r.x,r.y,Je),E.map.depthTexture.name=B.name+".shadowMapDepth",E.map.depthTexture.format=gi,E.map.depthTexture.compareFunction=null,E.map.depthTexture.minFilter=xe,E.map.depthTexture.magFilter=xe}else B.isPointLight?(E.map=new _r(r.x),E.map.depthTexture=new mr(r.x,ri)):(E.map=new Be(r.x,r.y),E.map.depthTexture=new ji(r.x,r.y,ri)),E.map.depthTexture.name=B.name+".shadowMap",E.map.depthTexture.format=gi,this.type===Dr?(E.map.depthTexture.compareFunction=D?Ao:lo,E.map.depthTexture.minFilter=Ue,E.map.depthTexture.magFilter=Ue):(E.map.depthTexture.compareFunction=null,E.map.depthTexture.minFilter=xe,E.map.depthTexture.magFilter=xe);E.camera.updateProjectionMatrix()}E.map.isWebGLCubeRenderTarget!==!0&&(E.map.width!==r.x||E.map.height!==r.y)&&E.map.setSize(r.x,r.y);let J=E.map.isWebGLCubeRenderTarget?6:E.getViewportCount();B.isPointLight!==!0&&E.updateMatrices(B,y);let _=(E.camera.layers.mask&4294967294)!==0?E.camera.layers:y.layers;for(let Vt=0;Vt<J;Vt++){let Wt=E.getCamera(Vt);if(B.isPointLight){let F=E.camera,ht=E.matrix,St=B.distance||F.far;St!==F.far&&(F.far=St,F.updateProjectionMatrix()),Qr.setFromMatrixPosition(B.matrixWorld),F.position.copy(Qr),Oo.copy(F.position),Oo.add(L1[Vt]),F.up.copy(E1[Vt]),F.lookAt(Oo),F.updateMatrixWorld(),ht.makeTranslation(-Qr.x,-Qr.y,-Qr.z),Xl.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),E._frustum.setFromProjectionMatrix(Xl,F.coordinateSystem,F.reversedDepth)}if(E.map.isWebGLCubeRenderTarget)n.setRenderTarget(E.map,Vt),n.clear();else{Vt===0&&(n.setRenderTarget(E.map),n.clear());let F=E.getViewport(Vt);s.set(a.x*F.x,a.y*F.y,a.x*F.z,a.y*F.w),z.viewport(s)}i=E.getFrustum(Vt),b(I,y,Wt,B,_,this.type)}E.isPointLightShadow!==!0&&this.type===Mn&&O(E,y),E.needsUpdate=!1}R=this.type,f.needsUpdate=!1,n.setRenderTarget(L,j,N)};function O(P,I){let y=t.update(m);d.defines.VSM_SAMPLES!==P.blurSamples&&(d.defines.VSM_SAMPLES=P.blurSamples,A.defines.VSM_SAMPLES=P.blurSamples,d.needsUpdate=!0,A.needsUpdate=!0),P.mapPass===null?P.mapPass=new Be(r.x,r.y,{format:Ji,type:ai}):(P.mapPass.width!==P.map.width||P.mapPass.height!==P.map.height)&&P.mapPass.setSize(P.map.width,P.map.height),d.uniforms.shadow_pass.value=P.map.depthTexture,d.uniforms.resolution.value.set(P.map.width,P.map.height),d.uniforms.radius.value=P.radius,n.setRenderTarget(P.mapPass),n.clear(),n.renderBufferDirect(I,null,y,d,m,null),A.uniforms.shadow_pass.value=P.mapPass.texture,A.uniforms.resolution.value.set(P.map.width,P.map.height),A.uniforms.radius.value=P.radius,n.setRenderTarget(P.map),n.clear(),n.renderBufferDirect(I,null,y,A,m,null)}function H(P,I,y,L){let j=null,N=y.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(N!==void 0)j=N;else if(j=y.isPointLight===!0?u:c,n.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let z=j.uuid,G=I.uuid,W=o[z];W===void 0&&(W={},o[z]=W);let Z=W[G];Z===void 0&&(Z=j.clone(),W[G]=Z,I.addEventListener("dispose",x)),j=Z}if(j.visible=I.visible,j.wireframe=I.wireframe,L===Mn?j.side=I.shadowSide!==null?I.shadowSide:I.side:j.side=I.shadowSide!==null?I.shadowSide:p[I.side],j.alphaMap=I.alphaMap,j.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,j.map=I.map,j.clipShadows=I.clipShadows,j.clippingPlanes=I.clippingPlanes,j.clipIntersection=I.clipIntersection,j.displacementMap=I.displacementMap,j.displacementScale=I.displacementScale,j.displacementBias=I.displacementBias,j.wireframeLinewidth=I.wireframeLinewidth,j.linewidth=I.linewidth,y.isPointLight===!0&&j.isMeshDistanceMaterial===!0){let z=n.properties.get(j);z.light=y}return j}function b(P,I,y,L,j,N){if(P.visible===!1)return;if(P.layers.test(j)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&N===Mn)&&(!P.frustumCulled||P.intersectsFrustum(i))){P.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,P.matrixWorld);let W=t.update(P),Z=P.material;if(Array.isArray(Z)){let B=W.groups;for(let E=0,et=B.length;E<et;E++){let D=B[E],J=Z[D.materialIndex];if(J&&J.visible){let _=H(P,J,L,N);P.onBeforeShadow(n,P,I,y,W,_,D),n.renderBufferDirect(y,null,W,_,P,D),P.onAfterShadow(n,P,I,y,W,_,D)}}}else if(Z.visible){let B=H(P,Z,L,N);P.onBeforeShadow(n,P,I,y,W,B,null),n.renderBufferDirect(y,null,W,B,P,null),P.onAfterShadow(n,P,I,y,W,B,null)}}let G=P.children;for(let W=0,Z=G.length;W<Z;W++)b(G[W],I,y,L,j,N)}function x(P){P.target.removeEventListener("dispose",x);for(let y in o){let L=o[y],j=P.target.uuid;j in L&&(L[j].dispose(),delete L[j])}}}function k1(n,t){function e(){let g=!1,Y=new pe,K=null,dt=new pe(0,0,0,0);return{setMask:function(rt){K!==rt&&!g&&(n.colorMask(rt,rt,rt,rt),K=rt)},setLocked:function(rt){g=rt},setClear:function(rt,ot,Tt,Kt,nt){nt===!0&&(rt*=Kt,ot*=Kt,Tt*=Kt),Y.set(rt,ot,Tt,Kt),dt.equals(Y)===!1&&(n.clearColor(rt,ot,Tt,Kt),dt.copy(Y))},reset:function(){g=!1,K=null,dt.set(-1,0,0,0)}}}function i(){let g=!1,Y=!1,K=null,dt=null,rt=null;return{setReversed:function(ot){if(Y!==ot){let Tt=t.get("EXT_clip_control");ot?Tt.clipControlEXT(Tt.LOWER_LEFT_EXT,Tt.ZERO_TO_ONE_EXT):Tt.clipControlEXT(Tt.LOWER_LEFT_EXT,Tt.NEGATIVE_ONE_TO_ONE_EXT),Y=ot;let Kt=rt;rt=null,this.setClear(Kt)}},getReversed:function(){return Y},setTest:function(ot){ot?pt(n.DEPTH_TEST):Nt(n.DEPTH_TEST)},setMask:function(ot){K!==ot&&!g&&(n.depthMask(ot),K=ot)},setFunc:function(ot){if(Y&&(ot=rl[ot]),dt!==ot){switch(ot){case Wa:n.depthFunc(n.NEVER);break;case ja:n.depthFunc(n.ALWAYS);break;case va:n.depthFunc(n.LESS);break;case vn:n.depthFunc(n.LEQUAL);break;case Ta:n.depthFunc(n.EQUAL);break;case Na:n.depthFunc(n.GEQUAL);break;case Xa:n.depthFunc(n.GREATER);break;case La:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}dt=ot}},setLocked:function(ot){g=ot},setClear:function(ot){rt!==ot&&(rt=ot,Y&&(ot=1-ot),n.clearDepth(ot))},reset:function(){g=!1,K=null,dt=null,rt=null,Y=!1}}}function r(){let g=!1,Y=null,K=null,dt=null,rt=null,ot=null,Tt=null,Kt=null,nt=null;return{setTest:function(Lt){g||(Lt?pt(n.STENCIL_TEST):Nt(n.STENCIL_TEST))},setMask:function(Lt){Y!==Lt&&!g&&(n.stencilMask(Lt),Y=Lt)},setFunc:function(Lt,Bt,mt){(K!==Lt||dt!==Bt||rt!==mt)&&(n.stencilFunc(Lt,Bt,mt),K=Lt,dt=Bt,rt=mt)},setOp:function(Lt,Bt,mt){(ot!==Lt||Tt!==Bt||Kt!==mt)&&(n.stencilOp(Lt,Bt,mt),ot=Lt,Tt=Bt,Kt=mt)},setLocked:function(Lt){g=Lt},setClear:function(Lt){nt!==Lt&&(n.clearStencil(Lt),nt=Lt)},reset:function(){g=!1,Y=null,K=null,dt=null,rt=null,ot=null,Tt=null,Kt=null,nt=null}}}let a=new e,s=new i,c=new r,u={},o=new WeakMap,l={},p={},d={},A=new WeakMap,h=[],m=null,f=!1,R=null,O=null,H=null,b=null,x=null,P=null,I=null,y=new Gt(0,0,0),L=0,j=!1,N=null,z=null,G=null,W=null,Z=null,B=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),E=!1,et=0,D=n.getParameter(n.VERSION);D.indexOf("WebGL")!==-1?(et=parseFloat(/^WebGL (\d)/.exec(D)[1]),E=et>=1):D.indexOf("OpenGL ES")!==-1&&(et=parseFloat(/^OpenGL ES (\d)/.exec(D)[1]),E=et>=2);let J=null,_={},Vt=n.getParameter(n.SCISSOR_BOX),Wt=n.getParameter(n.VIEWPORT),F=new pe().fromArray(Vt),ht=new pe().fromArray(Wt);function St(g,Y,K,dt){let rt=new Uint8Array(4),ot=n.createTexture();n.bindTexture(g,ot),n.texParameteri(g,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(g,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Tt=0;Tt<K;Tt++)g===n.TEXTURE_3D||g===n.TEXTURE_2D_ARRAY?n.texImage3D(Y,0,n.RGBA,1,1,dt,0,n.RGBA,n.UNSIGNED_BYTE,rt):n.texImage2D(Y+Tt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,rt);return ot}let vt={};vt[n.TEXTURE_2D]=St(n.TEXTURE_2D,n.TEXTURE_2D,1),vt[n.TEXTURE_CUBE_MAP]=St(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),vt[n.TEXTURE_2D_ARRAY]=St(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),vt[n.TEXTURE_3D]=St(n.TEXTURE_3D,n.TEXTURE_3D,1,1),a.setClear(0,0,0,1),s.setClear(1),c.setClear(0),pt(n.DEPTH_TEST),s.setFunc(vn),yt(!1),ut(Bc),pt(n.CULL_FACE),st(ln);function pt(g){l[g]!==!0&&(n.enable(g),l[g]=!0)}function Nt(g){l[g]!==!1&&(n.disable(g),l[g]=!1)}function oe(g,Y){return d[g]!==Y?(n.bindFramebuffer(g,Y),d[g]=Y,g===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=Y),g===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=Y),!0):!1}function Xt(g,Y){let K=h,dt=!1;if(g){K=A.get(Y),K===void 0&&(K=[],A.set(Y,K));let rt=g.textures;if(K.length!==rt.length||K[0]!==n.COLOR_ATTACHMENT0){for(let ot=0,Tt=rt.length;ot<Tt;ot++)K[ot]=n.COLOR_ATTACHMENT0+ot;K.length=rt.length,dt=!0}}else K[0]!==n.BACK&&(K[0]=n.BACK,dt=!0);dt&&n.drawBuffers(K)}function Zt(g){return m!==g?(n.useProgram(g),m=g,!0):!1}let Ct={[dn]:n.FUNC_ADD,[Pu]:n.FUNC_SUBTRACT,[xu]:n.FUNC_REVERSE_SUBTRACT};Ct[gu]=n.MIN,Ct[Wu]=n.MAX;let tt={[ju]:n.ZERO,[vu]:n.ONE,[Tu]:n.SRC_COLOR,[Cc]:n.SRC_ALPHA,[ku]:n.SRC_ALPHA_SATURATE,[Eu]:n.DST_COLOR,[Xu]:n.DST_ALPHA,[Nu]:n.ONE_MINUS_SRC_COLOR,[Jc]:n.ONE_MINUS_SRC_ALPHA,[zu]:n.ONE_MINUS_DST_COLOR,[Lu]:n.ONE_MINUS_DST_ALPHA,[wu]:n.CONSTANT_COLOR,[Uu]:n.ONE_MINUS_CONSTANT_COLOR,[Du]:n.CONSTANT_ALPHA,[Zu]:n.ONE_MINUS_CONSTANT_ALPHA};function st(g,Y,K,dt,rt,ot,Tt,Kt,nt,Lt){if(g===ln){f===!0&&(Nt(n.BLEND),f=!1);return}if(f===!1&&(pt(n.BLEND),f=!0),g!==Hu){if(g!==R||Lt!==j){if((O!==dn||x!==dn)&&(n.blendEquation(n.FUNC_ADD),O=dn,x=dn),Lt)switch(g){case Bn:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Gc:n.blendFunc(n.ONE,n.ONE);break;case Kc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Fc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:kt("WebGLState: Invalid blending: ",g);break}else switch(g){case Bn:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Gc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Kc:kt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Fc:kt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:kt("WebGLState: Invalid blending: ",g);break}H=null,b=null,P=null,I=null,y.set(0,0,0),L=0,R=g,j=Lt}return}rt=rt||Y,ot=ot||K,Tt=Tt||dt,(Y!==O||rt!==x)&&(n.blendEquationSeparate(Ct[Y],Ct[rt]),O=Y,x=rt),(K!==H||dt!==b||ot!==P||Tt!==I)&&(n.blendFuncSeparate(tt[K],tt[dt],tt[ot],tt[Tt]),H=K,b=dt,P=ot,I=Tt),(Kt.equals(y)===!1||nt!==L)&&(n.blendColor(Kt.r,Kt.g,Kt.b,nt),y.copy(Kt),L=nt),R=g,j=!1}function at(g,Y){g.side===Ii?Nt(n.CULL_FACE):pt(n.CULL_FACE);let K=g.side===je;Y&&(K=!K),yt(K),g.blending===Bn&&g.transparent===!1?st(ln):st(g.blending,g.blendEquation,g.blendSrc,g.blendDst,g.blendEquationAlpha,g.blendSrcAlpha,g.blendDstAlpha,g.blendColor,g.blendAlpha,g.premultipliedAlpha),s.setFunc(g.depthFunc),s.setTest(g.depthTest),s.setMask(g.depthWrite),a.setMask(g.colorWrite);let dt=g.stencilWrite;c.setTest(dt),dt&&(c.setMask(g.stencilWriteMask),c.setFunc(g.stencilFunc,g.stencilRef,g.stencilFuncMask),c.setOp(g.stencilFail,g.stencilZFail,g.stencilZPass)),gt(g.polygonOffset,g.polygonOffsetFactor,g.polygonOffsetUnits),g.alphaToCoverage===!0?pt(n.SAMPLE_ALPHA_TO_COVERAGE):Nt(n.SAMPLE_ALPHA_TO_COVERAGE)}function yt(g){N!==g&&(g?n.frontFace(n.CW):n.frontFace(n.CCW),N=g)}function ut(g){g!==yu?(pt(n.CULL_FACE),g!==z&&(g===Bc?n.cullFace(n.BACK):g===Ou?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Nt(n.CULL_FACE),z=g}function wt(g){g!==G&&(E&&n.lineWidth(g),G=g)}function gt(g,Y,K){g?(pt(n.POLYGON_OFFSET_FILL),(W!==Y||Z!==K)&&(W=Y,Z=K,s.getReversed()&&(Y=-Y,K=-K),n.polygonOffset(Y,K))):Nt(n.POLYGON_OFFSET_FILL)}function Jt(g){g?pt(n.SCISSOR_TEST):Nt(n.SCISSOR_TEST)}function _t(g){g===void 0&&(g=n.TEXTURE0+B-1),J!==g&&(n.activeTexture(g),J=g)}function ne(g,Y,K){K===void 0&&(J===null?K=n.TEXTURE0+B-1:K=J);let dt=_[K];dt===void 0&&(dt={type:void 0,texture:void 0},_[K]=dt),(dt.type!==g||dt.texture!==Y)&&(J!==K&&(n.activeTexture(K),J=K),n.bindTexture(g,Y||vt[g]),dt.type=g,dt.texture=Y)}function T(){let g=_[J];g!==void 0&&g.type!==void 0&&(n.bindTexture(g.type,null),g.type=void 0,g.texture=void 0)}function qe(){try{n.compressedTexImage2D(...arguments)}catch(g){kt("WebGLState:",g)}}function Qt(){try{n.compressedTexImage3D(...arguments)}catch(g){kt("WebGLState:",g)}}function ue(){try{n.texSubImage2D(...arguments)}catch(g){kt("WebGLState:",g)}}function ft(){try{n.texSubImage3D(...arguments)}catch(g){kt("WebGLState:",g)}}function Ie(){try{n.compressedTexSubImage2D(...arguments)}catch(g){kt("WebGLState:",g)}}function Et(){try{n.compressedTexSubImage3D(...arguments)}catch(g){kt("WebGLState:",g)}}function Ut(){try{n.texStorage2D(...arguments)}catch(g){kt("WebGLState:",g)}}function S(){try{n.texStorage3D(...arguments)}catch(g){kt("WebGLState:",g)}}function q(){try{n.texImage2D(...arguments)}catch(g){kt("WebGLState:",g)}}function w(){try{n.texImage3D(...arguments)}catch(g){kt("WebGLState:",g)}}function it(g){return p[g]!==void 0?p[g]:n.getParameter(g)}function $(g,Y){p[g]!==Y&&(n.pixelStorei(g,Y),p[g]=Y)}function ct(g){F.equals(g)===!1&&(n.scissor(g.x,g.y,g.z,g.w),F.copy(g))}function Rt(g){ht.equals(g)===!1&&(n.viewport(g.x,g.y,g.z,g.w),ht.copy(g))}function C(g,Y){let K=o.get(Y);K===void 0&&(K=new WeakMap,o.set(Y,K));let dt=K.get(g);dt===void 0&&(dt=n.getUniformBlockIndex(Y,g.name),n.uniformBlockBinding(Y,dt,dt),K.set(g,dt))}function Q(g,Y,K){let rt=o.get(Y).get(g);u[rt]!==K&&(n.bindBufferBase(n.UNIFORM_BUFFER,rt,K),u[rt]=K)}function lt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),s.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),l={},p={},J=null,_={},d={},u={},A=new WeakMap,h=[],m=null,f=!1,R=null,O=null,H=null,b=null,x=null,P=null,I=null,y=new Gt(0,0,0),L=0,j=!1,N=null,z=null,G=null,W=null,Z=null,F.set(0,0,n.canvas.width,n.canvas.height),ht.set(0,0,n.canvas.width,n.canvas.height),a.reset(),s.reset(),c.reset()}return{buffers:{color:a,depth:s,stencil:c},enable:pt,disable:Nt,bindFramebuffer:oe,drawBuffers:Xt,useProgram:Zt,setBlending:st,setMaterial:at,setFlipSided:yt,setCullFace:ut,setLineWidth:wt,setPolygonOffset:gt,setScissorTest:Jt,activeTexture:_t,bindTexture:ne,unbindTexture:T,compressedTexImage2D:qe,compressedTexImage3D:Qt,texImage2D:q,texImage3D:w,pixelStorei:$,getParameter:it,updateUBOMapping:C,uniformBlockBinding:Q,texStorage2D:Ut,texStorage3D:S,texSubImage2D:ue,texSubImage3D:ft,compressedTexSubImage2D:Ie,compressedTexSubImage3D:Et,scissor:ct,viewport:Rt,reset:lt}}function w1(n,t,e,i,r,a,s){let c=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,u=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),o=new qt,l=new WeakMap,p=new Set,d,A=new WeakMap,h=new Set,m=new FinalizationRegistry(S=>h.delete(S)),f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function R(S,q){return f?new OffscreenCanvas(S,q):Nn("canvas")}function O(S,q,w){let it=1,$=Ut(S);if(($.width>w||$.height>w)&&(it=w/Math.max($.width,$.height)),it<1)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap||typeof VideoFrame<"u"&&S instanceof VideoFrame){let ct=Math.floor(it*$.width),Rt=Math.floor(it*$.height);d===void 0&&(d=R(ct,Rt));let C=q?R(ct,Rt):d;return C.width=ct,C.height=Rt,C.getContext("2d").drawImage(S,0,0,ct,Rt),zt("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+ct+"x"+Rt+")."),C}else return"data"in S&&zt("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),S;return S}function H(S){return S.generateMipmaps}function b(S){n.generateMipmap(S)}function x(S){return S.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:S.isWebGL3DRenderTarget?n.TEXTURE_3D:S.isWebGLArrayRenderTarget||S.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function P(S,q,w,it,$,ct=!1){if(S!==null){if(n[S]!==void 0)return n[S];zt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let Rt;it&&(Rt=t.get("EXT_texture_norm16"),Rt||zt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let C=q;if(q===n.RED&&(w===n.FLOAT&&(C=n.R32F),w===n.HALF_FLOAT&&(C=n.R16F),w===n.UNSIGNED_BYTE&&(C=n.R8),w===n.UNSIGNED_SHORT&&Rt&&(C=Rt.R16_EXT),w===n.SHORT&&Rt&&(C=Rt.R16_SNORM_EXT)),q===n.RED_INTEGER&&(w===n.UNSIGNED_BYTE&&(C=n.R8UI),w===n.UNSIGNED_SHORT&&(C=n.R16UI),w===n.UNSIGNED_INT&&(C=n.R32UI),w===n.BYTE&&(C=n.R8I),w===n.SHORT&&(C=n.R16I),w===n.INT&&(C=n.R32I)),q===n.RG&&(w===n.FLOAT&&(C=n.RG32F),w===n.HALF_FLOAT&&(C=n.RG16F),w===n.UNSIGNED_BYTE&&(C=n.RG8),w===n.UNSIGNED_SHORT&&Rt&&(C=Rt.RG16_EXT),w===n.SHORT&&Rt&&(C=Rt.RG16_SNORM_EXT)),q===n.RG_INTEGER&&(w===n.UNSIGNED_BYTE&&(C=n.RG8UI),w===n.UNSIGNED_SHORT&&(C=n.RG16UI),w===n.UNSIGNED_INT&&(C=n.RG32UI),w===n.BYTE&&(C=n.RG8I),w===n.SHORT&&(C=n.RG16I),w===n.INT&&(C=n.RG32I)),q===n.RGB_INTEGER&&(w===n.UNSIGNED_BYTE&&(C=n.RGB8UI),w===n.UNSIGNED_SHORT&&(C=n.RGB16UI),w===n.UNSIGNED_INT&&(C=n.RGB32UI),w===n.BYTE&&(C=n.RGB8I),w===n.SHORT&&(C=n.RGB16I),w===n.INT&&(C=n.RGB32I)),q===n.RGBA_INTEGER&&(w===n.UNSIGNED_BYTE&&(C=n.RGBA8UI),w===n.UNSIGNED_SHORT&&(C=n.RGBA16UI),w===n.UNSIGNED_INT&&(C=n.RGBA32UI),w===n.BYTE&&(C=n.RGBA8I),w===n.SHORT&&(C=n.RGBA16I),w===n.INT&&(C=n.RGBA32I)),q===n.RGB&&(w===n.UNSIGNED_SHORT&&Rt&&(C=Rt.RGB16_EXT),w===n.SHORT&&Rt&&(C=Rt.RGB16_SNORM_EXT),w===n.UNSIGNED_INT_5_9_9_9_REV&&(C=n.RGB9_E5),w===n.UNSIGNED_INT_10F_11F_11F_REV&&(C=n.R11F_G11F_B10F)),q===n.RGBA){let Q=ct?lr:ee.getTransfer($);w===n.FLOAT&&(C=n.RGBA32F),w===n.HALF_FLOAT&&(C=n.RGBA16F),w===n.UNSIGNED_BYTE&&(C=Q===ae?n.SRGB8_ALPHA8:n.RGBA8),w===n.UNSIGNED_SHORT&&Rt&&(C=Rt.RGBA16_EXT),w===n.SHORT&&Rt&&(C=Rt.RGBA16_SNORM_EXT),w===n.UNSIGNED_SHORT_4_4_4_4&&(C=n.RGBA4),w===n.UNSIGNED_SHORT_5_5_5_1&&(C=n.RGB5_A1)}return(C===n.R16F||C===n.R32F||C===n.RG16F||C===n.RG32F||C===n.RGBA16F||C===n.RGBA32F)&&t.get("EXT_color_buffer_float"),C}function I(S,q){let w;return S?q===null||q===ri||q===pn?w=n.DEPTH24_STENCIL8:q===Je?w=n.DEPTH32F_STENCIL8:q===Kn&&(w=n.DEPTH24_STENCIL8,zt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):q===null||q===ri||q===pn?w=n.DEPTH_COMPONENT24:q===Je?w=n.DEPTH_COMPONENT32F:q===Kn&&(w=n.DEPTH_COMPONENT16),w}function y(S,q){return H(S)===!0||S.isFramebufferTexture&&S.minFilter!==xe&&S.minFilter!==Ue?Math.log2(Math.max(q.width,q.height))+1:S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?q.mipmaps.length:1}function L(S){let q=new WeakRef(S);i.get(S).__ref=q,h.add(q),m.register(S,q,q)}function j(S){let q=i.get(S).__ref;q!==void 0&&(h.delete(q),m.unregister(q))}function N(S){G(S.target)}function z(S){W(S.target)}function G(S){S.removeEventListener("dispose",N),j(S),B(S),S.isVideoTexture&&l.delete(S),S.isHTMLTexture&&p.delete(S)}function W(S){S.removeEventListener("dispose",z),j(S),et(S)}function Z(){for(let S of h){let q=S.deref();q!==void 0&&(q.isRenderTarget===!0?W(q):G(q))}h.clear(),p.clear()}function B(S){let q=i.get(S);if(q.__webglInit===void 0)return;let w=S.source,it=A.get(w);if(it){let $=it[q.__cacheKey];$.usedTimes--,$.usedTimes===0&&E(S),Object.keys(it).length===0&&A.delete(w)}i.remove(S)}function E(S){let q=i.get(S);n.deleteTexture(q.__webglTexture);let w=S.source,it=A.get(w);delete it[q.__cacheKey],s.memory.textures--}function et(S){let q=i.get(S);q.__depthDisposeCallback&&q.__depthDisposeCallback();let w=S.depthTexture;if(w&&w.renderTarget===S&&G(w),S.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(q.__webglFramebuffer[$]))for(let ct=0;ct<q.__webglFramebuffer[$].length;ct++)n.deleteFramebuffer(q.__webglFramebuffer[$][ct]);else n.deleteFramebuffer(q.__webglFramebuffer[$]);q.__webglDepthbuffer&&n.deleteRenderbuffer(q.__webglDepthbuffer[$])}else{if(Array.isArray(q.__webglFramebuffer))for(let $=0;$<q.__webglFramebuffer.length;$++)n.deleteFramebuffer(q.__webglFramebuffer[$]);else n.deleteFramebuffer(q.__webglFramebuffer);if(q.__webglDepthbuffer&&n.deleteRenderbuffer(q.__webglDepthbuffer),q.__webglMultisampledFramebuffer&&n.deleteFramebuffer(q.__webglMultisampledFramebuffer),q.__webglColorRenderbuffer)for(let $=0;$<q.__webglColorRenderbuffer.length;$++)q.__webglColorRenderbuffer[$]&&n.deleteRenderbuffer(q.__webglColorRenderbuffer[$]);q.__webglDepthRenderbuffer&&n.deleteRenderbuffer(q.__webglDepthRenderbuffer)}let it=S.textures;for(let $=0,ct=it.length;$<ct;$++){let Rt=i.get(it[$]);Rt.__webglTexture&&(n.deleteTexture(Rt.__webglTexture),s.memory.textures--),i.remove(it[$])}i.remove(S)}let D=0;function J(){D=0}function _(){return D}function Vt(S){D=S}function Wt(){let S=D;return S>=r.maxTextures&&zt("WebGLTextures: Trying to use "+(S+1)+" texture units while this GPU supports only "+r.maxTextures),D+=1,S}function F(S){let q=[];return q.push(S.wrapS),q.push(S.wrapT),q.push(S.wrapR||0),q.push(S.magFilter),q.push(S.minFilter),q.push(S.anisotropy),q.push(S.internalFormat),q.push(S.format),q.push(S.type),q.push(S.generateMipmaps),q.push(S.mipmapsAutoUpdate),q.push(S.premultiplyAlpha),q.push(S.flipY),q.push(S.unpackAlignment),q.push(S.colorSpace),q.join()}function ht(S,q){let w=i.get(S);if(S.isVideoTexture&&Ie(S),S.isRenderTargetTexture===!1&&S.isExternalTexture!==!0&&S.version>0&&w.__version!==S.version){let it=S.image;if(it===null)zt("WebGLRenderer: Texture marked for update but no image data found.");else if(it.complete===!1)zt("WebGLRenderer: Texture marked for update but image is incomplete");else{at(w,S,q);return}}else S.isExternalTexture&&(w.__webglTexture=S.sourceTexture?S.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,w.__webglTexture,n.TEXTURE0+q)}function St(S,q){let w=i.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&w.__version!==S.version){at(w,S,q);return}else S.isExternalTexture&&(w.__webglTexture=S.sourceTexture?S.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,w.__webglTexture,n.TEXTURE0+q)}function vt(S,q){let w=i.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&w.__version!==S.version){at(w,S,q);return}e.bindTexture(n.TEXTURE_3D,w.__webglTexture,n.TEXTURE0+q)}function pt(S,q){let w=i.get(S);if(S.version>0&&w.__version!==S.version){yt(w,S,q);return}e.bindTexture(n.TEXTURE_CUBE_MAP,w.__webglTexture,n.TEXTURE0+q)}let Nt={[Ea]:n.REPEAT,[oi]:n.CLAMP_TO_EDGE,[za]:n.MIRRORED_REPEAT},oe={[xe]:n.NEAREST,[Gu]:n.NEAREST_MIPMAP_NEAREST,[Zr]:n.NEAREST_MIPMAP_LINEAR,[Ue]:n.LINEAR,[fs]:n.LINEAR_MIPMAP_NEAREST,[vi]:n.LINEAR_MIPMAP_LINEAR},Xt={[Ju]:n.NEVER,[po]:n.ALWAYS,[Qu]:n.LESS,[lo]:n.LEQUAL,[Yu]:n.EQUAL,[Ao]:n.GEQUAL,[_u]:n.GREATER,[$u]:n.NOTEQUAL};function Zt(S,q){if(q.type===Je&&t.has("OES_texture_float_linear")===!1&&(q.magFilter===Ue||q.magFilter===fs||q.magFilter===Zr||q.magFilter===vi||q.minFilter===Ue||q.minFilter===fs||q.minFilter===Zr||q.minFilter===vi)&&zt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(S,n.TEXTURE_WRAP_S,Nt[q.wrapS]),n.texParameteri(S,n.TEXTURE_WRAP_T,Nt[q.wrapT]),(S===n.TEXTURE_3D||S===n.TEXTURE_2D_ARRAY)&&n.texParameteri(S,n.TEXTURE_WRAP_R,Nt[q.wrapR]),n.texParameteri(S,n.TEXTURE_MAG_FILTER,oe[q.magFilter]),n.texParameteri(S,n.TEXTURE_MIN_FILTER,oe[q.minFilter]),q.compareFunction&&(n.texParameteri(S,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(S,n.TEXTURE_COMPARE_FUNC,Xt[q.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(q.magFilter===xe||q.minFilter!==Zr&&q.minFilter!==vi||q.type===Je&&t.has("OES_texture_float_linear")===!1)return;if(q.anisotropy>1||i.get(q).__currentAnisotropy){let w=t.get("EXT_texture_filter_anisotropic");n.texParameterf(S,w.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(q.anisotropy,r.getMaxAnisotropy())),i.get(q).__currentAnisotropy=q.anisotropy}}}function Ct(S,q){let w=!1;S.__webglInit===void 0&&(S.__webglInit=!0,q.addEventListener("dispose",N),L(q));let it=q.source,$=A.get(it);$===void 0&&($={},A.set(it,$));let ct=F(q);if(ct!==S.__cacheKey){$[ct]===void 0&&($[ct]={texture:n.createTexture(),usedTimes:0},s.memory.textures++,w=!0),$[ct].usedTimes++;let Rt=$[S.__cacheKey];Rt!==void 0&&($[S.__cacheKey].usedTimes--,Rt.usedTimes===0&&E(q)),S.__cacheKey=ct,S.__webglTexture=$[ct].texture}return w}function tt(S,q,w){return Math.floor(Math.floor(S/w)/q)}function st(S,q,w,it){let ct=S.updateRanges;if(ct.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,q.width,q.height,w,it,q.data);else{ct.sort((g,Y)=>g.start-Y.start);let Rt=0;for(let g=1;g<ct.length;g++){let Y=ct[Rt],K=ct[g],dt=Y.start+Y.count,rt=tt(K.start,q.width,4),ot=tt(Y.start,q.width,4);K.start<=dt+1&&rt===ot&&tt(K.start+K.count-1,q.width,4)===rt?Y.count=Math.max(Y.count,K.start+K.count-Y.start):(++Rt,ct[Rt]=K)}ct.length=Rt+1;let C=e.getParameter(n.UNPACK_ROW_LENGTH),Q=e.getParameter(n.UNPACK_SKIP_PIXELS),lt=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,q.width);for(let g=0,Y=ct.length;g<Y;g++){let K=ct[g],dt=Math.floor(K.start/4),rt=Math.ceil(K.count/4),ot=dt%q.width,Tt=Math.floor(dt/q.width),Kt=rt,nt=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,ot),e.pixelStorei(n.UNPACK_SKIP_ROWS,Tt),e.texSubImage2D(n.TEXTURE_2D,0,ot,Tt,Kt,nt,w,it,q.data)}S.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,C),e.pixelStorei(n.UNPACK_SKIP_PIXELS,Q),e.pixelStorei(n.UNPACK_SKIP_ROWS,lt)}}function at(S,q,w){let it=n.TEXTURE_2D;(q.isDataArrayTexture||q.isCompressedArrayTexture)&&(it=n.TEXTURE_2D_ARRAY),q.isData3DTexture&&(it=n.TEXTURE_3D);let $=Ct(S,q),ct=q.source;e.bindTexture(it,S.__webglTexture,n.TEXTURE0+w);let Rt=i.get(ct);if(ct.version!==Rt.__version||$===!0){if(e.activeTexture(n.TEXTURE0+w),(typeof ImageBitmap<"u"&&q.image instanceof ImageBitmap)===!1){let nt=ee.getPrimaries(ee.workingColorSpace),Lt=q.colorSpace===Ni?null:ee.getPrimaries(q.colorSpace),Bt=q.colorSpace===Ni||nt===Lt?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,q.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Bt)}e.pixelStorei(n.UNPACK_ALIGNMENT,q.unpackAlignment);let Q=O(q.image,!1,r.maxTextureSize);Q=Et(q,Q);let lt=a.convert(q.format,q.colorSpace),g=a.convert(q.type),Y=P(q.internalFormat,lt,g,q.normalized,q.colorSpace,q.isVideoTexture);Zt(it,q);let K,dt=q.mipmaps,rt=q.isVideoTexture!==!0,ot=Rt.__version===void 0||$===!0,Tt=ct.dataReady,Kt=y(q,Q);if(q.isDepthTexture)Y=I(q.format===Ti,q.type),ot&&(rt?e.texStorage2D(n.TEXTURE_2D,1,Y,Q.width,Q.height):e.texImage2D(n.TEXTURE_2D,0,Y,Q.width,Q.height,0,lt,g,null));else if(q.isDataTexture)if(dt.length>0){rt&&ot&&e.texStorage2D(n.TEXTURE_2D,Kt,Y,dt[0].width,dt[0].height);for(let nt=0,Lt=dt.length;nt<Lt;nt++)K=dt[nt],rt?Tt&&e.texSubImage2D(n.TEXTURE_2D,nt,0,0,K.width,K.height,lt,g,K.data):e.texImage2D(n.TEXTURE_2D,nt,Y,K.width,K.height,0,lt,g,K.data);q.generateMipmaps=!1}else rt?(ot&&e.texStorage2D(n.TEXTURE_2D,Kt,Y,Q.width,Q.height),Tt&&st(q,Q,lt,g)):e.texImage2D(n.TEXTURE_2D,0,Y,Q.width,Q.height,0,lt,g,Q.data);else if(q.isCompressedTexture)if(q.isCompressedArrayTexture){rt&&ot&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Kt,Y,dt[0].width,dt[0].height,Q.depth);for(let nt=0,Lt=dt.length;nt<Lt;nt++)if(K=dt[nt],q.format!==si)if(lt!==null)if(rt){if(Tt)if(q.layerUpdates.size>0){let Bt=bo(K.width,K.height,q.format,q.type);for(let mt of q.layerUpdates){let se=K.data.subarray(mt*Bt/K.data.BYTES_PER_ELEMENT,(mt+1)*Bt/K.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,nt,0,0,mt,K.width,K.height,1,lt,se)}}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,nt,0,0,0,K.width,K.height,Q.depth,lt,K.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,nt,Y,K.width,K.height,Q.depth,0,K.data,0,0);else zt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else rt?Tt&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,nt,0,0,0,K.width,K.height,Q.depth,lt,g,K.data):e.texImage3D(n.TEXTURE_2D_ARRAY,nt,Y,K.width,K.height,Q.depth,0,lt,g,K.data);q.layerUpdates.size>0&&q.clearLayerUpdates()}else{rt&&ot&&e.texStorage2D(n.TEXTURE_2D,Kt,Y,dt[0].width,dt[0].height);for(let nt=0,Lt=dt.length;nt<Lt;nt++)K=dt[nt],q.format!==si?lt!==null?rt?Tt&&e.compressedTexSubImage2D(n.TEXTURE_2D,nt,0,0,K.width,K.height,lt,K.data):e.compressedTexImage2D(n.TEXTURE_2D,nt,Y,K.width,K.height,0,K.data):zt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):rt?Tt&&e.texSubImage2D(n.TEXTURE_2D,nt,0,0,K.width,K.height,lt,g,K.data):e.texImage2D(n.TEXTURE_2D,nt,Y,K.width,K.height,0,lt,g,K.data)}else if(q.isDataArrayTexture)if(rt){if(ot&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Kt,Y,Q.width,Q.height,Q.depth),Tt)if(q.layerUpdates.size>0){let nt=bo(Q.width,Q.height,q.format,q.type);for(let Lt of q.layerUpdates){let Bt=Q.data.subarray(Lt*nt/Q.data.BYTES_PER_ELEMENT,(Lt+1)*nt/Q.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Lt,Q.width,Q.height,1,lt,g,Bt)}q.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,lt,g,Q.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Y,Q.width,Q.height,Q.depth,0,lt,g,Q.data);else if(q.isData3DTexture)rt?(ot&&e.texStorage3D(n.TEXTURE_3D,Kt,Y,Q.width,Q.height,Q.depth),Tt&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,lt,g,Q.data)):e.texImage3D(n.TEXTURE_3D,0,Y,Q.width,Q.height,Q.depth,0,lt,g,Q.data);else if(q.isFramebufferTexture){if(ot)if(rt)e.texStorage2D(n.TEXTURE_2D,Kt,Y,Q.width,Q.height);else{let nt=Q.width,Lt=Q.height;for(let Bt=0;Bt<Kt;Bt++)e.texImage2D(n.TEXTURE_2D,Bt,Y,nt,Lt,0,lt,g,null),nt>>=1,Lt>>=1}}else if(q.isHTMLTexture){if("texElementImage2D"in n){let nt=n.canvas;if(nt.hasAttribute("layoutsubtree")||nt.setAttribute("layoutsubtree","true"),Q.parentNode!==nt){nt.appendChild(Q),p.add(q),nt.onpaint=Lt=>{let Bt=Lt.changedElements;for(let mt of p)Bt.includes(mt.image)&&(mt.needsUpdate=!0)},nt.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,Q);else{let Bt=n.RGBA,mt=n.RGBA,se=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Bt,mt,se,Q)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(dt.length>0){if(rt&&ot){let nt=Ut(dt[0]);e.texStorage2D(n.TEXTURE_2D,Kt,Y,nt.width,nt.height)}for(let nt=0,Lt=dt.length;nt<Lt;nt++)K=dt[nt],rt?Tt&&e.texSubImage2D(n.TEXTURE_2D,nt,0,0,lt,g,K):e.texImage2D(n.TEXTURE_2D,nt,Y,lt,g,K);q.generateMipmaps=!1}else if(rt){if(ot){let nt=Ut(Q);e.texStorage2D(n.TEXTURE_2D,Kt,Y,nt.width,nt.height)}Tt&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,lt,g,Q)}else e.texImage2D(n.TEXTURE_2D,0,Y,lt,g,Q);H(q)&&q.mipmapsAutoUpdate===!0&&b(it),Rt.__version=ct.version,q.onUpdate&&q.onUpdate(q)}S.__version=q.version}function yt(S,q,w){if(q.image.length!==6)return;let it=Ct(S,q),$=q.source;e.bindTexture(n.TEXTURE_CUBE_MAP,S.__webglTexture,n.TEXTURE0+w);let ct=i.get($);if($.version!==ct.__version||it===!0){e.activeTexture(n.TEXTURE0+w);let Rt=ee.getPrimaries(ee.workingColorSpace),C=q.colorSpace===Ni?null:ee.getPrimaries(q.colorSpace),Q=q.colorSpace===Ni||Rt===C?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,q.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,q.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);let lt=q.isCompressedTexture||q.image[0].isCompressedTexture,g=q.image[0]&&q.image[0].isDataTexture,Y=[];for(let mt=0;mt<6;mt++)!lt&&!g?Y[mt]=O(q.image[mt],!0,r.maxCubemapSize):Y[mt]=g?q.image[mt].image:q.image[mt],Y[mt]=Et(q,Y[mt]);let K=Y[0],dt=a.convert(q.format,q.colorSpace),rt=a.convert(q.type),ot=P(q.internalFormat,dt,rt,q.normalized,q.colorSpace),Tt=q.isVideoTexture!==!0,Kt=ct.__version===void 0||it===!0,nt=$.dataReady,Lt=y(q,K);Zt(n.TEXTURE_CUBE_MAP,q);let Bt;if(q.isDepthTexture){if(ot=I(q.format===Ti,q.type),Kt)if(Tt)e.texStorage2D(n.TEXTURE_CUBE_MAP,1,ot,K.width,K.height);else for(let mt=0;mt<6;mt++)e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,ot,K.width,K.height,0,dt,rt,null)}else if(lt){Tt&&Kt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,Lt,ot,K.width,K.height);for(let mt=0;mt<6;mt++){Bt=Y[mt].mipmaps;for(let se=0;se<Bt.length;se++){let Se=Bt[se];q.format!==si?dt!==null?Tt?nt&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+mt,se,0,0,Se.width,Se.height,dt,Se.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+mt,se,ot,Se.width,Se.height,0,Se.data):zt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Tt?nt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+mt,se,0,0,Se.width,Se.height,dt,rt,Se.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+mt,se,ot,Se.width,Se.height,0,dt,rt,Se.data)}}}else{if(Bt=q.mipmaps,Tt&&Kt){Bt.length>0&&Lt++;let mt=Ut(Y[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,Lt,ot,mt.width,mt.height)}for(let mt=0;mt<6;mt++)if(g){Tt?nt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,0,0,Y[mt].width,Y[mt].height,dt,rt,Y[mt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,ot,Y[mt].width,Y[mt].height,0,dt,rt,Y[mt].data);for(let se=0;se<Bt.length;se++){let Xi=Bt[se].image[mt].image;Tt?nt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+mt,se+1,0,0,Xi.width,Xi.height,dt,rt,Xi.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+mt,se+1,ot,Xi.width,Xi.height,0,dt,rt,Xi.data)}}else{Tt?nt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,0,0,dt,rt,Y[mt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,ot,dt,rt,Y[mt]);for(let se=0;se<Bt.length;se++){let Se=Bt[se];Tt?nt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+mt,se+1,0,0,dt,rt,Se.image[mt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+mt,se+1,ot,dt,rt,Se.image[mt])}}}H(q)&&q.mipmapsAutoUpdate===!0&&b(n.TEXTURE_CUBE_MAP),ct.__version=$.version,q.onUpdate&&q.onUpdate(q)}S.__version=q.version}function ut(S,q,w,it,$,ct){let Rt=a.convert(w.format,w.colorSpace),C=a.convert(w.type),Q=P(w.internalFormat,Rt,C,w.normalized,w.colorSpace),lt=i.get(q),g=i.get(w);if(g.__renderTarget=q,!lt.__hasExternalTextures){let Y=Math.max(1,q.width>>ct),K=Math.max(1,q.height>>ct);$===n.TEXTURE_3D||$===n.TEXTURE_2D_ARRAY?e.texImage3D($,ct,Q,Y,K,q.depth,0,Rt,C,null):e.texImage2D($,ct,Q,Y,K,0,Rt,C,null)}e.bindFramebuffer(n.FRAMEBUFFER,S),ft(q)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,it,$,g.__webglTexture,0,ue(q)):($===n.TEXTURE_2D||$>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,it,$,g.__webglTexture,ct),e.bindFramebuffer(n.FRAMEBUFFER,null)}function wt(S,q,w){if(n.bindRenderbuffer(n.RENDERBUFFER,S),q.depthBuffer){let it=q.depthTexture,$=it&&it.isDepthTexture?it.type:null,ct=I(q.stencilBuffer,$),Rt=q.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;ft(q)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ue(q),ct,q.width,q.height):w?n.renderbufferStorageMultisample(n.RENDERBUFFER,ue(q),ct,q.width,q.height):n.renderbufferStorage(n.RENDERBUFFER,ct,q.width,q.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Rt,n.RENDERBUFFER,S)}else{let it=q.textures;for(let $=0;$<it.length;$++){let ct=it[$],Rt=a.convert(ct.format,ct.colorSpace),C=a.convert(ct.type),Q=P(ct.internalFormat,Rt,C,ct.normalized,ct.colorSpace);ft(q)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ue(q),Q,q.width,q.height):w?n.renderbufferStorageMultisample(n.RENDERBUFFER,ue(q),Q,q.width,q.height):n.renderbufferStorage(n.RENDERBUFFER,Q,q.width,q.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function gt(S,q,w){let it=q.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,S),!(q.depthTexture&&q.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let $=i.get(q.depthTexture);$.__renderTarget=q;let ct=it?q.depthTexture.image[0]:q.depthTexture.image;(!$.__webglTexture||ct.width!==q.width||ct.height!==q.height)&&(ct.width=q.width,ct.height=q.height,q.depthTexture.needsUpdate=!0),it?pt(q.depthTexture,0):ht(q.depthTexture,0);let Rt=$.__webglTexture,C=ue(q),Q=it?n.TEXTURE_CUBE_MAP_POSITIVE_X+w:n.TEXTURE_2D,lt=q.depthTexture.format===Ti?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(q.depthTexture.format===gi)ft(q)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,lt,Q,Rt,0,C):n.framebufferTexture2D(n.FRAMEBUFFER,lt,Q,Rt,0);else if(q.depthTexture.format===Ti)ft(q)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,lt,Q,Rt,0,C):n.framebufferTexture2D(n.FRAMEBUFFER,lt,Q,Rt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Jt(S){let q=i.get(S),w=S.isWebGLCubeRenderTarget===!0;if(q.__boundDepthTexture!==S.depthTexture){let it=S.depthTexture;if(q.__depthDisposeCallback&&q.__depthDisposeCallback(),it){let $=()=>{delete q.__boundDepthTexture,delete q.__depthDisposeCallback,it.removeEventListener("dispose",$)};it.addEventListener("dispose",$),q.__depthDisposeCallback=$}q.__boundDepthTexture=it}if(S.depthTexture&&!q.__autoAllocateDepthBuffer)if(w)for(let it=0;it<6;it++)gt(q.__webglFramebuffer[it],S,it);else S.texture.mipmaps.length>0?gt(q.__webglFramebuffer[0],S,0):gt(q.__webglFramebuffer,S,0);else if(w){q.__webglDepthbuffer=[];for(let it=0;it<6;it++)if(e.bindFramebuffer(n.FRAMEBUFFER,q.__webglFramebuffer[it]),q.__webglDepthbuffer[it]===void 0)q.__webglDepthbuffer[it]=n.createRenderbuffer(),wt(q.__webglDepthbuffer[it],S,!1);else{let $=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ct=q.__webglDepthbuffer[it];n.bindRenderbuffer(n.RENDERBUFFER,ct),n.framebufferRenderbuffer(n.FRAMEBUFFER,$,n.RENDERBUFFER,ct)}}else if(S.texture.mipmaps.length>0?e.bindFramebuffer(n.FRAMEBUFFER,q.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,q.__webglFramebuffer),q.__webglDepthbuffer===void 0)q.__webglDepthbuffer=n.createRenderbuffer(),wt(q.__webglDepthbuffer,S,!1);else{let $=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ct=q.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ct),n.framebufferRenderbuffer(n.FRAMEBUFFER,$,n.RENDERBUFFER,ct)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function _t(S,q,w){let it=i.get(S);q!==void 0&&ut(it.__webglFramebuffer,S,S.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),w!==void 0&&Jt(S)}function ne(S){let q=S.texture,w=i.get(S),it=i.get(q);S.addEventListener("dispose",z),L(S);let $=S.textures,ct=S.isWebGLCubeRenderTarget===!0,Rt=$.length>1;if(Rt||(it.__webglTexture===void 0&&(it.__webglTexture=n.createTexture()),it.__version=q.version,s.memory.textures++),ct){w.__webglFramebuffer=[];for(let C=0;C<6;C++)if(q.mipmaps.length>0){w.__webglFramebuffer[C]=[];for(let Q=0;Q<q.mipmaps.length;Q++)w.__webglFramebuffer[C][Q]=n.createFramebuffer()}else w.__webglFramebuffer[C]=n.createFramebuffer()}else{if(q.mipmaps.length>0){w.__webglFramebuffer=[];for(let C=0;C<q.mipmaps.length;C++)w.__webglFramebuffer[C]=n.createFramebuffer()}else w.__webglFramebuffer=n.createFramebuffer();if(Rt)for(let C=0,Q=$.length;C<Q;C++){let lt=i.get($[C]);lt.__webglTexture===void 0&&(lt.__webglTexture=n.createTexture(),s.memory.textures++)}if(S.samples>0&&ft(S)===!1){w.__webglMultisampledFramebuffer=n.createFramebuffer(),w.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,w.__webglMultisampledFramebuffer);for(let C=0;C<$.length;C++){let Q=$[C];w.__webglColorRenderbuffer[C]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,w.__webglColorRenderbuffer[C]);let lt=a.convert(Q.format,Q.colorSpace),g=a.convert(Q.type),Y=P(Q.internalFormat,lt,g,Q.normalized,Q.colorSpace,S.isXRRenderTarget===!0),K=ue(S);n.renderbufferStorageMultisample(n.RENDERBUFFER,K,Y,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+C,n.RENDERBUFFER,w.__webglColorRenderbuffer[C])}n.bindRenderbuffer(n.RENDERBUFFER,null),S.depthBuffer&&(w.__webglDepthRenderbuffer=n.createRenderbuffer(),wt(w.__webglDepthRenderbuffer,S,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ct){e.bindTexture(n.TEXTURE_CUBE_MAP,it.__webglTexture),Zt(n.TEXTURE_CUBE_MAP,q);for(let C=0;C<6;C++)if(q.mipmaps.length>0)for(let Q=0;Q<q.mipmaps.length;Q++)ut(w.__webglFramebuffer[C][Q],S,q,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+C,Q);else ut(w.__webglFramebuffer[C],S,q,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+C,0);H(q)?b(n.TEXTURE_CUBE_MAP):q.mipmaps.length>0&&n.texParameteri(n.TEXTURE_CUBE_MAP,n.TEXTURE_MAX_LEVEL,q.mipmaps.length-1),e.unbindTexture()}else if(Rt){for(let C=0,Q=$.length;C<Q;C++){let lt=$[C],g=i.get(lt),Y=n.TEXTURE_2D;(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(Y=S.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(Y,g.__webglTexture),Zt(Y,lt),ut(w.__webglFramebuffer,S,lt,n.COLOR_ATTACHMENT0+C,Y,0),H(lt)&&b(Y)}e.unbindTexture()}else{let C=n.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(C=S.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(C,it.__webglTexture),Zt(C,q),q.mipmaps.length>0)for(let Q=0;Q<q.mipmaps.length;Q++)ut(w.__webglFramebuffer[Q],S,q,n.COLOR_ATTACHMENT0,C,Q);else ut(w.__webglFramebuffer,S,q,n.COLOR_ATTACHMENT0,C,0);H(q)?b(C):q.mipmaps.length>0&&n.texParameteri(C,n.TEXTURE_MAX_LEVEL,q.mipmaps.length-1),e.unbindTexture()}S.depthBuffer&&Jt(S)}function T(S){let q=S.textures;for(let w=0,it=q.length;w<it;w++){let $=q[w];if(H($)&&$.mipmapsAutoUpdate===!0){let ct=x(S),Rt=i.get($).__webglTexture;e.bindTexture(ct,Rt),b(ct),e.unbindTexture()}}}let qe=[];function Qt(S){if(S.samples>0){if(ft(S)===!1){let q=S.textures,w=S.width,it=S.height,$=n.COLOR_BUFFER_BIT,ct=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Rt=i.get(S),C=q.length>1;if(C)for(let lt=0;lt<q.length;lt++)e.bindFramebuffer(n.FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+lt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,Rt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+lt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),S.texture.mipmaps.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Rt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Rt.__webglFramebuffer);for(let lt=0;lt<q.length;lt++){if(S.resolveDepthBuffer&&(S.depthBuffer&&($|=n.DEPTH_BUFFER_BIT),S.stencilBuffer&&S.resolveStencilBuffer&&($|=n.STENCIL_BUFFER_BIT)),C){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Rt.__webglColorRenderbuffer[lt]);let g=i.get(q[lt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,g,0)}n.blitFramebuffer(0,0,w,it,0,0,w,it,$,n.NEAREST),u===!0&&(qe.length=0,qe.push(n.COLOR_ATTACHMENT0+lt),S.depthBuffer&&S.storeMultisampledDepthBuffer===!1&&qe.push(ct),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,qe))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),C)for(let lt=0;lt<q.length;lt++){e.bindFramebuffer(n.FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+lt,n.RENDERBUFFER,Rt.__webglColorRenderbuffer[lt]);let g=i.get(q[lt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,Rt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+lt,n.TEXTURE_2D,g,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Rt.__webglMultisampledFramebuffer)}else if(S.depthBuffer&&S.storeMultisampledDepthBuffer===!1&&u){let q=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[q])}}}function ue(S){return Math.min(r.maxSamples,S.samples)}function ft(S){let q=i.get(S);return S.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&q.__useRenderToTexture!==!1}function Ie(S){let q=s.render.frame;l.get(S)!==q&&(l.set(S,q),S.update())}function Et(S,q){let w=S.colorSpace,it=S.format,$=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||w!==ur&&w!==Ni&&(ee.getTransfer(w)===ae?(it!==si||$!==De)&&zt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):kt("WebGLTextures: Unsupported texture color space:",w)),q}function Ut(S){return typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement?(o.width=S.naturalWidth||S.width,o.height=S.naturalHeight||S.height):typeof VideoFrame<"u"&&S instanceof VideoFrame?(o.width=S.displayWidth,o.height=S.displayHeight):(o.width=S.width,o.height=S.height),o}this.allocateTextureUnit=Wt,this.resetTextureUnits=J,this.getTextureUnits=_,this.setTextureUnits=Vt,this.setTexture2D=ht,this.setTexture2DArray=St,this.setTexture3D=vt,this.setTextureCube=pt,this.rebindTextures=_t,this.setupRenderTarget=ne,this.updateRenderTargetMipmap=T,this.updateMultisampleRenderTarget=Qt,this.setupDepthRenderbuffer=Jt,this.setupFrameBufferTexture=ut,this.useMultisampledRTT=ft,this.dispose=Z}function U1(n,t){function e(i,r=Ni){let a,s=ee.getTransfer(r);if(i===De)return n.UNSIGNED_BYTE;if(i===Is)return n.UNSIGNED_SHORT_4_4_4_4;if(i===hs)return n.UNSIGNED_SHORT_5_5_5_1;if(i===so)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===co)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===ro)return n.BYTE;if(i===ao)return n.SHORT;if(i===Kn)return n.UNSIGNED_SHORT;if(i===Rs)return n.INT;if(i===ri)return n.UNSIGNED_INT;if(i===Je)return n.FLOAT;if(i===ai)return n.HALF_FLOAT;if(i===oo)return n.ALPHA;if(i===uo)return n.RGB;if(i===si)return n.RGBA;if(i===gi)return n.DEPTH_COMPONENT;if(i===Ti)return n.DEPTH_STENCIL;if(i===qs)return n.RED;if(i===Vs)return n.RED_INTEGER;if(i===Ji)return n.RG;if(i===ms)return n.RG_INTEGER;if(i===bs)return n.RGBA_INTEGER;if(i===Mr||i===Br||i===Gr||i===Kr)if(s===ae)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===Mr)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Br)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Gr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Kr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===Mr)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Br)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Gr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Kr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ys||i===Os||i===Ss||i===Hs)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===ys)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Os)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ss)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Hs)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ps||i===xs||i===gs||i===Ws||i===js||i===Fr||i===vs)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(i===Ps||i===xs)return s===ae?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===gs)return s===ae?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(i===Ws)return a.COMPRESSED_R11_EAC;if(i===js)return a.COMPRESSED_SIGNED_R11_EAC;if(i===Fr)return a.COMPRESSED_RG11_EAC;if(i===vs)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Ts||i===Ns||i===Xs||i===Ls||i===Es||i===zs||i===ks||i===ws||i===Us||i===Ds||i===Zs||i===Ms||i===Bs||i===Gs)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(i===Ts)return s===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ns)return s===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Xs)return s===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ls)return s===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Es)return s===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===zs)return s===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ks)return s===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ws)return s===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Us)return s===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ds)return s===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Zs)return s===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ms)return s===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Bs)return s===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Gs)return s===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ks||i===Fs||i===Cs)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(i===Ks)return s===ae?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Fs)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Cs)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Js||i===Qs||i===Cr||i===Ys)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(i===Js)return a.COMPRESSED_RED_RGTC1_EXT;if(i===Qs)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Cr)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ys)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===pn?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var D1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Z1=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,jo=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let i=new br(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new fi({vertexShader:D1,fragmentShader:Z1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new he(new Bi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},vo=class extends ui{constructor(t,e){super();let i=this,r=null,a=1,s=null,c="local-floor",u=1,o=null,l=null,p=null,d=null,A=null,h=null,m=typeof XRWebGLBinding<"u",f=new jo,R={},O=e.getContextAttributes(),H=null,b=null,x=[],P=[],I=new qt,y=null,L=null,j=new Ee;j.viewport=new pe;let N=new Ee;N.viewport=new pe;let z=[j,N],G=new ls,W=null,Z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(F){let ht=x[F];return ht===void 0&&(ht=new En,x[F]=ht),ht.getTargetRaySpace()},this.getControllerGrip=function(F){let ht=x[F];return ht===void 0&&(ht=new En,x[F]=ht),ht.getGripSpace()},this.getHand=function(F){let ht=x[F];return ht===void 0&&(ht=new En,x[F]=ht),ht.getHandSpace()};function B(F){let ht=P.indexOf(F.inputSource);if(ht===-1)return;let St=x[ht];St!==void 0&&(St.update(F.inputSource,F.frame,o||s),St.dispatchEvent({type:F.type,data:F.inputSource}))}function E(){r.removeEventListener("select",B),r.removeEventListener("selectstart",B),r.removeEventListener("selectend",B),r.removeEventListener("squeeze",B),r.removeEventListener("squeezestart",B),r.removeEventListener("squeezeend",B),r.removeEventListener("end",E),r.removeEventListener("inputsourceschange",et);for(let F=0;F<x.length;F++){let ht=P[F];ht!==null&&(P[F]=null,x[F].disconnect(ht))}W=null,Z=null,f.reset();for(let F in R)delete R[F];if(t.setRenderTarget(H),A=null,d=null,p=null,r=null,b=null,Wt.stop(),i.isPresenting=!1,t.setPixelRatio(y),t.setSize(I.width,I.height,!1),L!==null){let F=L.camera;F.fov=L.fov,F.zoom=L.zoom,F.updateProjectionMatrix(),L=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(F){a=F,i.isPresenting===!0&&zt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(F){c=F,i.isPresenting===!0&&zt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return o||s},this.setReferenceSpace=function(F){o=F},this.getBaseLayer=function(){return d!==null?d:A},this.getBinding=function(){return p===null&&m&&(p=new XRWebGLBinding(r,e)),p},this.getFrame=function(){return h},this.getSession=function(){return r},this.setSession=async function(F){if(r=F,r!==null){if(H=t.getRenderTarget(),r.addEventListener("select",B),r.addEventListener("selectstart",B),r.addEventListener("selectend",B),r.addEventListener("squeeze",B),r.addEventListener("squeezestart",B),r.addEventListener("squeezeend",B),r.addEventListener("end",E),r.addEventListener("inputsourceschange",et),O.xrCompatible!==!0&&await e.makeXRCompatible(),y=t.getPixelRatio(),t.getSize(I),m&&"createProjectionLayer"in XRWebGLBinding.prototype){let St=null,vt=null,pt=null;O.depth&&(pt=O.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,St=O.stencil?Ti:gi,vt=O.stencil?pn:ri);let Nt={colorFormat:e.RGBA8,depthFormat:pt,scaleFactor:a};p=this.getBinding(),d=p.createProjectionLayer(Nt),r.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),b=new Be(d.textureWidth,d.textureHeight,{format:si,type:De,depthTexture:new ji(d.textureWidth,d.textureHeight,vt,void 0,void 0,void 0,void 0,void 0,void 0,St),stencilBuffer:O.stencil,colorSpace:t.outputColorSpace,samples:O.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let St={antialias:O.antialias,alpha:!0,depth:O.depth,stencil:O.stencil,framebufferScaleFactor:a};A=new XRWebGLLayer(r,e,St),r.updateRenderState({baseLayer:A}),t.setPixelRatio(1),t.setSize(A.framebufferWidth,A.framebufferHeight,!1),b=new Be(A.framebufferWidth,A.framebufferHeight,{format:si,type:De,colorSpace:t.outputColorSpace,stencilBuffer:O.stencil,resolveDepthBuffer:A.ignoreDepthValues===!1,resolveStencilBuffer:A.ignoreDepthValues===!1,storeMultisampledDepthBuffer:A.ignoreDepthValues===!1,storeMultisampledStencilBuffer:A.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(u),o=null,s=await r.requestReferenceSpace(c),Wt.setContext(r),Wt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function et(F){for(let ht=0;ht<F.removed.length;ht++){let St=F.removed[ht],vt=P.indexOf(St);vt>=0&&(P[vt]=null,x[vt].disconnect(St))}for(let ht=0;ht<F.added.length;ht++){let St=F.added[ht],vt=P.indexOf(St);if(vt===-1){for(let Nt=0;Nt<x.length;Nt++)if(Nt>=P.length){P.push(St),vt=Nt;break}else if(P[Nt]===null){P[Nt]=St,vt=Nt;break}if(vt===-1)break}let pt=x[vt];pt&&pt.connect(St)}}function D(F,ht){ht===null?F.matrixWorld.copy(F.matrix):F.matrixWorld.multiplyMatrices(ht.matrixWorld,F.matrix),F.matrixWorldInverse.copy(F.matrixWorld).invert()}this.updateCamera=function(F){if(r===null)return;let ht=F.near,St=F.far;f.texture!==null&&(f.depthNear>0&&(ht=f.depthNear),f.depthFar>0&&(St=f.depthFar)),G.near=N.near=j.near=ht,G.far=N.far=j.far=St,(W!==G.near||Z!==G.far)&&(r.updateRenderState({depthNear:G.near,depthFar:G.far}),W=G.near,Z=G.far),G.layers.mask=F.layers.mask|6,j.layers.mask=G.layers.mask&-5,N.layers.mask=G.layers.mask&-3;let vt=F.parent,pt=G.cameras;D(G,vt);for(let Nt=0;Nt<pt.length;Nt++)D(pt[Nt],vt);G.projectionMatrix.copy(j.projectionMatrix),G.projectionMatrixInverse.copy(j.projectionMatrixInverse),L===null&&F.isPerspectiveCamera&&(L={camera:F,fov:F.fov,zoom:F.zoom}),J(F,G,vt)};function J(F,ht,St){St===null?F.matrix.copy(ht.matrixWorld):(F.matrix.copy(St.matrixWorld),F.matrix.invert(),F.matrix.multiply(ht.matrixWorld)),F.matrix.decompose(F.position,F.quaternion,F.scale),F.updateMatrixWorld(!0),F.projectionMatrix.copy(ht.projectionMatrix),F.projectionMatrixInverse.copy(ht.projectionMatrixInverse),F.isPerspectiveCamera&&(F.fov=wa*2*Math.atan(1/F.projectionMatrix.elements[5]),F.zoom=1)}this.getCamera=function(){return G},this.getFoveation=function(){if(!(d===null&&A===null))return u},this.setFoveation=function(F){u=F,d!==null&&(d.fixedFoveation=F),A!==null&&A.fixedFoveation!==void 0&&(A.fixedFoveation=F)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(G)},this.getCameraTexture=function(F){return R[F]};let _=null;function Vt(F,ht){if(l=ht.getViewerPose(o||s),h=ht,l!==null){let St=l.views;A!==null&&(t.setRenderTargetFramebuffer(b,A.framebuffer),t.setRenderTarget(b));let vt=!1;St.length!==G.cameras.length&&(G.cameras.length=0,vt=!0);for(let Xt=0;Xt<St.length;Xt++){let Zt=St[Xt],Ct=null;if(A!==null)Ct=A.getViewport(Zt);else{let st=p.getViewSubImage(d,Zt);Ct=st.viewport,Xt===0&&(t.setRenderTargetTextures(b,st.colorTexture,st.depthStencilTexture),t.setRenderTarget(b))}let tt=z[Xt];tt===void 0&&(tt=new Ee,tt.layers.enable(Xt),tt.viewport=new pe,z[Xt]=tt),tt.matrix.fromArray(Zt.transform.matrix),tt.matrix.decompose(tt.position,tt.quaternion,tt.scale),tt.projectionMatrix.fromArray(Zt.projectionMatrix),tt.projectionMatrixInverse.copy(tt.projectionMatrix).invert(),tt.viewport.set(Ct.x,Ct.y,Ct.width,Ct.height),Xt===0&&(G.matrix.copy(tt.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale)),vt===!0&&G.cameras.push(tt)}let pt=r.enabledFeatures;if(pt&&pt.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&m){p=i.getBinding();let Xt=p.getDepthInformation(St[0]);Xt&&Xt.isValid&&Xt.texture&&f.init(Xt,r.renderState)}if(pt&&pt.includes("camera-access")&&m){t.state.unbindTexture(),p=i.getBinding();for(let Xt=0;Xt<St.length;Xt++){let Zt=St[Xt].camera;if(Zt){let Ct=R[Zt];Ct||(Ct=new br,R[Zt]=Ct);let tt=p.getCameraImage(Zt);Ct.sourceTexture=tt}}}}for(let St=0;St<x.length;St++){let vt=P[St],pt=x[St];vt!==null&&pt!==void 0&&pt.update(vt,ht,o||s)}_&&_(F,ht),ht.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ht}),h=null}let Wt=new Ll;Wt.setAnimationLoop(Vt),this.setAnimationLoop=function(F){_=F},this.dispose=function(){}}},M1=new ce,Gl=new Dt;Gl.set(-1,0,0,0,1,0,0,0,1);function B1(n,t){function e(f,R){f.matrixAutoUpdate===!0&&f.updateMatrix(),R.value.copy(f.matrix)}function i(f,R){R.color.getRGB(f.fogColor.value,qo(n)),R.isFog?(f.fogNear.value=R.near,f.fogFar.value=R.far):R.isFogExp2&&(f.fogDensity.value=R.density)}function r(f,R,O,H,b){R.isNodeMaterial?R.uniformsNeedUpdate=!1:R.isMeshBasicMaterial?a(f,R):R.isMeshLambertMaterial?(a(f,R),R.envMap&&(f.envMapIntensity.value=R.envMapIntensity)):R.isMeshToonMaterial?(a(f,R),p(f,R)):R.isMeshPhongMaterial?(a(f,R),l(f,R),R.envMap&&(f.envMapIntensity.value=R.envMapIntensity)):R.isMeshStandardMaterial?(a(f,R),d(f,R),R.isMeshPhysicalMaterial&&A(f,R,b)):R.isMeshMatcapMaterial?(a(f,R),h(f,R)):R.isMeshDepthMaterial?a(f,R):R.isMeshDistanceMaterial?(a(f,R),m(f,R)):R.isMeshNormalMaterial?a(f,R):R.isLineBasicMaterial?(s(f,R),R.isLineDashedMaterial&&c(f,R)):R.isPointsMaterial?u(f,R,O,H):R.isSpriteMaterial?o(f,R):R.isShadowMaterial?(f.color.value.copy(R.color),f.opacity.value=R.opacity):R.isShaderMaterial&&(R.uniformsNeedUpdate=!1)}function a(f,R){f.opacity.value=R.opacity,R.color&&f.diffuse.value.copy(R.color),R.emissive&&f.emissive.value.copy(R.emissive).multiplyScalar(R.emissiveIntensity),R.map&&(f.map.value=R.map,e(R.map,f.mapTransform)),R.alphaMap&&(f.alphaMap.value=R.alphaMap,e(R.alphaMap,f.alphaMapTransform)),R.bumpMap&&(f.bumpMap.value=R.bumpMap,e(R.bumpMap,f.bumpMapTransform),f.bumpScale.value=R.bumpScale,R.side===je&&(f.bumpScale.value*=-1)),R.normalMap&&(f.normalMap.value=R.normalMap,e(R.normalMap,f.normalMapTransform),f.normalScale.value.copy(R.normalScale),R.side===je&&f.normalScale.value.negate()),R.displacementMap&&(f.displacementMap.value=R.displacementMap,e(R.displacementMap,f.displacementMapTransform),f.displacementScale.value=R.displacementScale,f.displacementBias.value=R.displacementBias),R.emissiveMap&&(f.emissiveMap.value=R.emissiveMap,e(R.emissiveMap,f.emissiveMapTransform)),R.specularMap&&(f.specularMap.value=R.specularMap,e(R.specularMap,f.specularMapTransform)),R.alphaTest>0&&(f.alphaTest.value=R.alphaTest);let O=t.get(R),H=O.envMap,b=O.envMapRotation;H&&(f.envMap.value=H,f.envMapRotation.value.setFromMatrix4(M1.makeRotationFromEuler(b)).transpose(),H.isCubeTexture&&H.isRenderTargetTexture===!1&&f.envMapRotation.value.premultiply(Gl),f.reflectivity.value=R.reflectivity,f.ior.value=R.ior,f.refractionRatio.value=R.refractionRatio),R.lightMap&&(f.lightMap.value=R.lightMap,f.lightMapIntensity.value=R.lightMapIntensity,e(R.lightMap,f.lightMapTransform)),R.aoMap&&(f.aoMap.value=R.aoMap,f.aoMapIntensity.value=R.aoMapIntensity,e(R.aoMap,f.aoMapTransform))}function s(f,R){f.diffuse.value.copy(R.color),f.opacity.value=R.opacity,R.map&&(f.map.value=R.map,e(R.map,f.mapTransform))}function c(f,R){f.dashSize.value=R.dashSize,f.totalSize.value=R.dashSize+R.gapSize,f.scale.value=R.scale}function u(f,R,O,H){f.diffuse.value.copy(R.color),f.opacity.value=R.opacity,f.size.value=R.size*O,f.scale.value=H*.5,R.map&&(f.map.value=R.map,e(R.map,f.uvTransform)),R.alphaMap&&(f.alphaMap.value=R.alphaMap,e(R.alphaMap,f.alphaMapTransform)),R.alphaTest>0&&(f.alphaTest.value=R.alphaTest)}function o(f,R){f.diffuse.value.copy(R.color),f.opacity.value=R.opacity,f.rotation.value=R.rotation,R.map&&(f.map.value=R.map,e(R.map,f.mapTransform)),R.alphaMap&&(f.alphaMap.value=R.alphaMap,e(R.alphaMap,f.alphaMapTransform)),R.alphaTest>0&&(f.alphaTest.value=R.alphaTest)}function l(f,R){f.specular.value.copy(R.specular),f.shininess.value=Math.max(R.shininess,1e-4)}function p(f,R){R.gradientMap&&(f.gradientMap.value=R.gradientMap)}function d(f,R){f.metalness.value=R.metalness,R.metalnessMap&&(f.metalnessMap.value=R.metalnessMap,e(R.metalnessMap,f.metalnessMapTransform)),f.roughness.value=R.roughness,R.roughnessMap&&(f.roughnessMap.value=R.roughnessMap,e(R.roughnessMap,f.roughnessMapTransform)),R.envMap&&(f.envMapIntensity.value=R.envMapIntensity)}function A(f,R,O){f.ior.value=R.ior,R.diffuseRoughness>0&&(f.diffuseRoughness.value=R.diffuseRoughness,R.diffuseRoughnessMap&&(f.diffuseRoughnessMap.value=R.diffuseRoughnessMap,e(R.diffuseRoughnessMap,f.diffuseRoughnessMapTransform))),R.sheen>0&&(f.sheenColor.value.copy(R.sheenColor).multiplyScalar(R.sheen),f.sheenRoughness.value=R.sheenRoughness,R.sheenColorMap&&(f.sheenColorMap.value=R.sheenColorMap,e(R.sheenColorMap,f.sheenColorMapTransform)),R.sheenRoughnessMap&&(f.sheenRoughnessMap.value=R.sheenRoughnessMap,e(R.sheenRoughnessMap,f.sheenRoughnessMapTransform))),R.clearcoat>0&&(f.clearcoat.value=R.clearcoat,f.clearcoatRoughness.value=R.clearcoatRoughness,R.clearcoatMap&&(f.clearcoatMap.value=R.clearcoatMap,e(R.clearcoatMap,f.clearcoatMapTransform)),R.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=R.clearcoatRoughnessMap,e(R.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),R.clearcoatNormalMap&&(f.clearcoatNormalMap.value=R.clearcoatNormalMap,e(R.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(R.clearcoatNormalScale),R.side===je&&f.clearcoatNormalScale.value.negate())),R.dispersion>0&&(f.dispersion.value=R.dispersion),R.retroreflectivity>0&&(f.retroreflectivity.value=R.retroreflectivity),R.iridescence>0&&(f.iridescence.value=R.iridescence,f.iridescenceIOR.value=R.iridescenceIOR,f.iridescenceThicknessMinimum.value=R.iridescenceThicknessMinimum,f.iridescenceThicknessMaximum.value=R.iridescenceThicknessMaximum,R.iridescenceMap&&(f.iridescenceMap.value=R.iridescenceMap,e(R.iridescenceMap,f.iridescenceMapTransform)),R.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=R.iridescenceThicknessMap,e(R.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),R.transmission>0&&(f.transmission.value=R.transmission,f.transmissionSamplerMap.value=O.texture,f.transmissionSamplerSize.value.set(O.width,O.height),R.transmissionMap&&(f.transmissionMap.value=R.transmissionMap,e(R.transmissionMap,f.transmissionMapTransform)),f.thickness.value=R.thickness,R.thicknessMap&&(f.thicknessMap.value=R.thicknessMap,e(R.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=R.attenuationDistance,f.attenuationColor.value.copy(R.attenuationColor)),R.anisotropy>0&&(f.anisotropyVector.value.set(R.anisotropy*Math.cos(R.anisotropyRotation),R.anisotropy*Math.sin(R.anisotropyRotation)),R.anisotropyMap&&(f.anisotropyMap.value=R.anisotropyMap,e(R.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=R.specularIntensity,f.specularColor.value.copy(R.specularColor),R.specularColorMap&&(f.specularColorMap.value=R.specularColorMap,e(R.specularColorMap,f.specularColorMapTransform)),R.specularIntensityMap&&(f.specularIntensityMap.value=R.specularIntensityMap,e(R.specularIntensityMap,f.specularIntensityMapTransform))}function h(f,R){R.matcap&&(f.matcap.value=R.matcap)}function m(f,R){let O=t.get(R).light;f.referencePosition.value.setFromMatrixPosition(O.matrixWorld),f.nearDistance.value=O.shadow.camera.near,f.farDistance.value=O.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function G1(n,t,e,i){let r={},a={};function s(O,H){let b=H.program;i.uniformBlockBinding(O,b,r[O.id])}function c(O,H){let b=r[O.id];b===void 0&&(h(O),b=u(O),r[O.id]=b,O.addEventListener("dispose",f));let x=H.program;i.updateUBOMapping(O,x);let P=t.render.frame;a[O.id]!==P&&(o(O),a[O.id]=P)}function u(O){let H=n.createBuffer(),b=O.__size,x=O.usage;return n.bindBuffer(n.UNIFORM_BUFFER,H),n.bufferData(n.UNIFORM_BUFFER,b,x),n.bindBuffer(n.UNIFORM_BUFFER,null),H}function o(O){let H=r[O.id],b=O.uniforms,x=O.__cache;n.bindBuffer(n.UNIFORM_BUFFER,H);for(let P=0,I=b.length;P<I;P++){let y=b[P];if(Array.isArray(y))for(let L=0,j=y.length;L<j;L++)l(y[L],P,L,x);else l(y,P,0,x)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function l(O,H,b,x){if(d(O,H,b,x)===!0){let P=O.__offset,I=O.value;if(Array.isArray(I)){let y=0;for(let L=0;L<I.length;L++){let j=I[L],N=m(j,!0);p(j,O.__data,y),y+=N.storage/Float32Array.BYTES_PER_ELEMENT}}else p(I,O.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,P,O.__data)}}function p(O,H,b){typeof O=="number"||typeof O=="boolean"?H[b]=O:O.isMatrix3?(H[b]=O.elements[0],H[b+1]=O.elements[1],H[b+2]=O.elements[2],H[b+3]=0,H[b+4]=O.elements[3],H[b+5]=O.elements[4],H[b+6]=O.elements[5],H[b+7]=0,H[b+8]=O.elements[6],H[b+9]=O.elements[7],H[b+10]=O.elements[8],H[b+11]=0):ArrayBuffer.isView(O)?H.set(O.subarray(0,H.length-b),b):O.toArray(H,b)}function d(O,H,b,x){let P=O.value,I=H+"_"+b;if(Array.isArray(P)){x[I]===void 0&&(x[I]=[]);let y=x[I],L=!1;for(let j=0;j<P.length;j++)A(P[j],y,j)===!0&&(L=!0);return L}return A(P,x,I)}function A(O,H,b){if(H[b]===void 0)return typeof O=="number"||typeof O=="boolean"?H[b]=O:ArrayBuffer.isView(O)?H[b]=O.slice():H[b]=O.clone(),!0;{let x=H[b];if(typeof O=="number"||typeof O=="boolean"){if(x!==O)return H[b]=O,!0}else{if(ArrayBuffer.isView(O))return!0;if(x.equals(O)===!1)return x.copy(O),!0}}return!1}function h(O){let H=O.uniforms,b=0,x=16;for(let I=0,y=H.length;I<y;I++){let L=Array.isArray(H[I])?H[I]:[H[I]];for(let j=0,N=L.length;j<N;j++){let z=L[j],G=Array.isArray(z.value)?z.value:[z.value],W=Array.isArray(H[I])||Array.isArray(z.value),Z=b;for(let E=0,et=G.length;E<et;E++){let D=G[E],J=m(D,W),_=b%x,Vt=_%J.boundary,Wt=_+Vt;b+=Vt,Wt!==0&&x-Wt<J.storage&&(b+=x-Wt),E===0&&(Z=b),b+=J.storage}let B=z.type==="int"?Int32Array:z.type==="uint"?Uint32Array:Float32Array;z.__data=new B((b-Z)/Float32Array.BYTES_PER_ELEMENT),z.__offset=Z}}let P=b%x;return P>0&&(b+=x-P),O.__size=b,O.__cache={},this}function m(O,H){let b={boundary:0,storage:0};return typeof O=="number"||typeof O=="boolean"?(b.boundary=4,b.storage=4):O.isVector2?(b.boundary=8,b.storage=8):O.isVector3||O.isColor?(b.boundary=16,b.storage=12):O.isVector4?(b.boundary=16,b.storage=16):O.isMatrix3?(b.boundary=16,b.storage=48):O.isMatrix4?(b.boundary=16,b.storage=64):O.isTexture?zt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(O)?(b.boundary=16,b.storage=O.byteLength):zt("WebGLRenderer: Unsupported uniform value type.",O),H===!0&&(b.boundary=16,b.storage=Math.ceil(b.storage/16)*16),b}function f(O){let H=O.target;H.removeEventListener("dispose",f),n.deleteBuffer(r[H.id]),delete r[H.id],delete a[H.id]}function R(){for(let O in r)n.deleteBuffer(r[O]);r={},a={}}return{bind:s,update:c,dispose:R}}var K1=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),qi=null;function F1(){return qi===null&&(qi=new Rr(K1,16,16,Ji,ai),qi.name="DFG_LUT",qi.minFilter=Ue,qi.magFilter=Ue,qi.wrapS=oi,qi.wrapT=oi,qi.generateMipmaps=!1,qi.needsUpdate=!0),qi}var tc=class{constructor(t={}){let{canvas:e=el(),context:i=null,depth:r=!0,stencil:a=!1,alpha:s=!1,antialias:c=!1,premultipliedAlpha:u=!0,preserveDrawingBuffer:o=!1,powerPreference:l="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:d=!1,outputBufferType:A=De}=t;this.isWebGLRenderer=!0;let h;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=i.getContextAttributes().alpha}else h=s;let m=A,f=new Set([bs,ms,Vs]),R=new Set([De,ri,Kn,pn,Is,hs]),O=new Uint32Array(4),H=new Int32Array(4),b={textures:[],min:[],max:[],resolution:[]},x=null,P=null,I=[],y=[],L=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=hi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let j=this,N=!1,z=null,G=null,W=null,Z=null;this._outputColorSpace=Le;let B=0,E=0,et=null,D=-1,J=null,_=new pe,Vt=new pe,Wt=null,F=new Gt(0),ht=0,St=e.width,vt=e.height,pt=1,Nt=null,oe=null,Xt=new pe(0,0,St,vt),Zt=new pe(0,0,St,vt),Ct=!1,tt=new Mi,st=new Ba,at=!1,yt=!1,ut=new ce,wt=new X,gt=new pe,Jt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},_t=!1;function ne(){return et===null?pt:1}let T=i;function qe(V,v){return e.getContext(V,v)}let Qt,ue,ft,Ie,Et,Ut,S,q,w,it,$,ct,Rt,C,Q,lt,g,Y,K,dt,rt,ot,Tt;try{let V={alpha:!0,depth:r,stencil:a,antialias:c,premultipliedAlpha:u,preserveDrawingBuffer:o,powerPreference:l,failIfMajorPerformanceCaveat:p};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"187"}`),e.addEventListener("webglcontextlost",Lt,!1),e.addEventListener("webglcontextrestored",Bt,!1),e.addEventListener("webglcontextcreationerror",mt,!1),T===null){let v="webgl2";if(T=qe(v,V),T===null)throw qe(v)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Kt()}catch(V){throw e.removeEventListener("webglcontextlost",Lt,!1),e.removeEventListener("webglcontextrestored",Bt,!1),e.removeEventListener("webglcontextcreationerror",mt,!1),kt("WebGLRenderer: "+V.message),V}function Kt(){Qt=new r0(T),Qt.init(),rt=new U1(T,Qt),ue=new Ff(T,Qt,t,rt),ft=new k1(T,Qt),ue.reversedDepthBuffer&&d&&ft.buffers.depth.setReversed(!0),G=T.createFramebuffer(),W=T.createFramebuffer(),Z=T.createFramebuffer(),Ie=new c0(T),Et=new S1,Ut=new w1(T,Qt,ft,Et,ue,rt,Ie),S=new n0(j),q=new oA(T),ot=new Gf(T,q),w=new a0(T,q,Ie,ot),it=new u0(T,w,q,ot,Ie),Y=new o0(T,ue,Ut),Q=new Cf(Et),$=new O1(j,S,Qt,ue,ot,Q),ct=new B1(j,Et),Rt=new P1,C=new T1(Qt),g=new Bf(j,S,ft,it,h,u),lt=new z1(j,it,ue),Tt=new G1(T,Ie,ue,ft),K=new Kf(T,Qt,Ie),dt=new s0(T,Qt,Ie),Ie.programs=$.programs,j.capabilities=ue,j.extensions=Qt,j.properties=Et,j.renderLists=Rt,j.shadowMap=lt,j.state=ft,j.info=Ie}m!==De&&(L=new d0(m,e.width,e.height,c,r,a));let nt=new vo(j,T);this.xr=nt,this.getContext=function(){return T},this.getContextAttributes=function(){return T.getContextAttributes()},this.forceContextLoss=function(){let V=Qt.get("WEBGL_lose_context");V&&V.loseContext()},this.forceContextRestore=function(){let V=Qt.get("WEBGL_lose_context");V&&V.restoreContext()},this.getPixelRatio=function(){return pt},this.setPixelRatio=function(V){V!==void 0&&(pt=V,this.setSize(St,vt,!1))},this.getSize=function(V){return V.set(St,vt)},this.setSize=function(V,v,M=!0){if(nt.isPresenting){zt("WebGLRenderer: Can't change size while VR device is presenting.");return}St=V,vt=v,e.width=Math.floor(V*pt),e.height=Math.floor(v*pt),M===!0&&(e.style.width=V+"px",e.style.height=v+"px"),L!==null&&L.setSize(e.width,e.height),this.setViewport(0,0,V,v)},this.getDrawingBufferSize=function(V){return V.set(St*pt,vt*pt).floor()},this.setDrawingBufferSize=function(V,v,M){St=V,vt=v,pt=M,e.width=Math.floor(V*M),e.height=Math.floor(v*M),this.setViewport(0,0,V,v)},this.setEffects=function(V){if(m===De){kt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(V){for(let v=0;v<V.length;v++)if(V[v].isOutputPass===!0){zt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}L.setEffects(V||[])},this.getCurrentViewport=function(V){return V.copy(_)},this.getViewport=function(V){return V.copy(Xt)},this.setViewport=function(V,v,M,k){V.isVector4?Xt.set(V.x,V.y,V.z,V.w):Xt.set(V,v,M,k),ft.viewport(_.copy(Xt).multiplyScalar(ne()).round())},this.getScissor=function(V){return V.copy(Zt)},this.setScissor=function(V,v,M,k){V.isVector4?Zt.set(V.x,V.y,V.z,V.w):Zt.set(V,v,M,k),ft.scissor(Vt.copy(Zt).multiplyScalar(ne()).round())},this.getScissorTest=function(){return Ct},this.setScissorTest=function(V){ft.setScissorTest(Ct=V)},this.setOpaqueSort=function(V){Nt=V},this.setTransparentSort=function(V){oe=V},this.getClearColor=function(V){return V.copy(g.getClearColor())},this.setClearColor=function(){g.setClearColor(...arguments)},this.getClearAlpha=function(){return g.getClearAlpha()},this.setClearAlpha=function(){g.setClearAlpha(...arguments)},this.clear=function(V=!0,v=!0,M=!0){let k=0;if(V){let U=!1;if(et!==null){let It=et.texture.format;U=f.has(It)}if(U){let It=et.texture.type,Ht=R.has(It),At=g.getClearColor(),Ot=g.getClearAlpha(),jt=At.r,Mt=At.g,$t=At.b;Ht?(O[0]=jt,O[1]=Mt,O[2]=$t,O[3]=Ot,T.clearBufferuiv(T.COLOR,0,O)):(H[0]=jt,H[1]=Mt,H[2]=$t,H[3]=Ot,T.clearBufferiv(T.COLOR,0,H))}else k|=T.COLOR_BUFFER_BIT}v&&(k|=T.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),M&&(k|=T.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&T.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(V){V.setRenderer(this),z=V},this.dispose=function(){e.removeEventListener("webglcontextlost",Lt,!1),e.removeEventListener("webglcontextrestored",Bt,!1),e.removeEventListener("webglcontextcreationerror",mt,!1),g.dispose(),Rt.dispose(),C.dispose(),Ut.dispose(),Et.dispose(),S.dispose(),it.dispose(),w.dispose(),ot.dispose(),Tt.dispose(),$.dispose(),nt.dispose(),nt.removeEventListener("sessionstart",Xo),nt.removeEventListener("sessionend",Lo),Qi.stop()};function Lt(V){V.preventDefault(),Ro("WebGLRenderer: Context Lost."),N=!0}function Bt(){Ro("WebGLRenderer: Context Restored."),N=!1;let V=Ie.autoReset,v=lt.enabled,M=lt.autoUpdate,k=lt.needsUpdate,U=lt.type;Kt(),Ie.autoReset=V,lt.enabled=v,lt.autoUpdate=M,lt.needsUpdate=k,lt.type=U}function mt(V){kt("WebGLRenderer: A WebGL context could not be created. Reason: ",V.statusMessage)}function se(V){let v=V.target;v.removeEventListener("dispose",se),Se(v)}function Se(V){Xi(V),Et.remove(V)}function Xi(V){let v=Et.get(V).programs;v!==void 0&&(v.forEach(function(M){$.releaseProgram(M)}),V.isShaderMaterial&&$.releaseShaderCache(V))}this.renderBufferDirect=function(V,v,M,k,U,It){v===null&&(v=Jt);let Ht=U.isMesh&&U.matrixWorld.determinantAffine()<0,At=Cl(V,v,M,k,U);ft.setMaterial(k,Ht);let Ot=M.index,jt=1;if(k.wireframe===!0){if(Ot=w.getWireframeAttribute(M),Ot===void 0)return;jt=2}let Mt=M.drawRange,$t=M.attributes.position,Pt=Mt.start*jt,te=(Mt.start+Mt.count)*jt;It!==null&&(Pt=Math.max(Pt,It.start*jt),te=Math.min(te,(It.start+It.count)*jt)),Ot!==null?(Pt=Math.max(Pt,0),te=Math.min(te,Ot.count)):$t!=null&&(Pt=Math.max(Pt,0),te=Math.min(te,$t.count));let Ve=te-Pt;if(Ve<0||Ve===1/0)return;ot.setup(U,k,At,M,Ot);let de,le=K;if(Ot!==null&&(de=q.get(Ot),le=dt,le.setIndex(de)),U.isMesh)k.wireframe===!0?(ft.setLineWidth(k.wireframeLinewidth*ne()),le.setMode(T.LINES)):le.setMode(T.TRIANGLES);else if(U.isLine){let ve=k.linewidth;ve===void 0&&(ve=1),ft.setLineWidth(ve*ne()),U.isLineSegments?le.setMode(T.LINES):U.isLineLoop?le.setMode(T.LINE_LOOP):le.setMode(T.LINE_STRIP)}else U.isPoints?le.setMode(T.POINTS):U.isSprite&&le.setMode(T.TRIANGLES);if(U.isBatchedMesh)if(Qt.get("WEBGL_multi_draw"))le.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{let ve=U._multiDrawStarts,xt=U._multiDrawCounts,we=U._multiDrawCount,re=Ot?q.get(Ot).bytesPerElement:1,Yi=Et.get(k).currentProgram.getUniforms();for(let Te=0;Te<we;Te++)Yi.setValue(T,"_gl_DrawID",Te),le.render(ve[Te]/re,xt[Te])}else if(U.isInstancedMesh)le.renderInstances(Pt,Ve,U.count);else if(M.isInstancedBufferGeometry){let ve=M._maxInstanceCount!==void 0?M._maxInstanceCount:1/0,xt=Math.min(M.instanceCount,ve);le.renderInstances(Pt,Ve,xt)}else le.render(Pt,Ve)};function No(V,v,M,k){z!==null&&V.isNodeMaterial&&z.setObject(k,V),at===!0&&Q.setState(V,M,!1),V.transparent===!0&&V.side===Ii&&V.forceSinglePass===!1?(V.side=je,V.needsUpdate=!0,_n(V,v,k),V.side=Ci,V.needsUpdate=!0,_n(V,v,k),V.side=Ii):_n(V,v,k)}this.compile=function(V,v,M=null){M===null&&(M=V),z!==null&&z.renderStart(V,v,M),P=C.get(M),P.init(v),y.push(P),M.traverseVisible(function(U){U.isLight&&U.layers.test(v.layers)&&(P.pushLight(U),U.castShadow&&P.pushShadow(U))}),V!==M&&V.traverseVisible(function(U){U.isLight&&U.layers.test(v.layers)&&(P.pushLight(U),U.castShadow&&P.pushShadow(U))}),P.setupLights(),z!==null&&z.updateLights(P.state.lightsArray),yt=this.localClippingEnabled,at=Q.init(this.clippingPlanes,yt),at===!0&&Q.setGlobalState(this.clippingPlanes,v),z!==null&&lt.render(P.state.shadowsArray,M,v);let k=new Set;return V.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;let It=U.material;if(It)if(Array.isArray(It))for(let Ht=0;Ht<It.length;Ht++){let At=It[Ht];No(At,M,v,U),k.add(At)}else No(It,M,v,U),k.add(It)}),P=y.pop(),z!==null&&z.renderEnd(),k},this.compileAsync=function(V,v,M=null){let k=this.compile(V,v,M);return new Promise(U=>{function It(){if(k.forEach(function(Ht){let Ot=Et.get(Ht).currentProgram;(Ot===void 0||Ot.isReady())&&k.delete(Ht)}),k.size===0){U(V);return}setTimeout(It,10)}Qt.get("KHR_parallel_shader_compile")!==null?It():setTimeout(It,10)})};let ac=null;function Kl(V){ac&&ac(V)}function Xo(){Qi.stop()}function Lo(){Qi.start()}let Qi=new Ll;Qi.setAnimationLoop(Kl),typeof self<"u"&&Qi.setContext(self),this.setAnimationLoop=function(V){ac=V,nt.setAnimationLoop(V),V===null?Qi.stop():Qi.start()},nt.addEventListener("sessionstart",Xo),nt.addEventListener("sessionend",Lo),this.render=function(V,v){if(v!==void 0&&v.isCamera!==!0){kt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;z!==null&&z.renderStart(V,v);let M=nt.enabled===!0&&nt.isPresenting===!0,k=L!==null&&(et===null||M)&&L.begin(j,et);if(V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),v.parent===null&&v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),nt.enabled===!0&&nt.isPresenting===!0&&(L===null||L.isCompositing()===!1)&&(nt.cameraAutoUpdate===!0&&nt.updateCamera(v),v=nt.getCamera()),V.isScene===!0&&V.onBeforeRender(j,V,v,et),P=C.get(V,y.length),P.init(v),P.state.textureUnits=Ut.getTextureUnits(),y.push(P),ut.multiplyMatrices(v.projectionMatrix,v.matrixWorldInverse),v.isArrayCamera?st.setFromArrayCamera(v):tt.setFromProjectionMatrix(ut,Ce,v.reversedDepth),yt=this.localClippingEnabled,at=Q.init(this.clippingPlanes,yt),x=Rt.get(V,I.length),x.init(),I.push(x),this.info.render.frame++,nt.enabled===!0&&nt.isPresenting===!0){let Ht=j.xr.getDepthSensingMesh();Ht!==null&&sc(Ht,v,-1/0,j.sortObjects)}sc(V,v,0,j.sortObjects),x.finish(),z!==null&&z.updateLights(P.state.lightsArray),j.sortObjects===!0&&x.sort(Nt,oe),_t=nt.enabled===!1||nt.isPresenting===!1||nt.hasDepthSensing()===!1,_t&&g.addToRenderList(x,V),this.info.autoReset===!0&&this.info.reset(),at===!0&&Q.beginShadows();let U=P.state.shadowsArray;if(lt.render(U,V,v),at===!0&&Q.endShadows(),(k&&L.hasRenderPass())===!1){let Ht=x.opaque,At=x.transmissive;if(P.setupLights(),v.isArrayCamera){let Ot=v.cameras;if(At.length>0)for(let jt=0,Mt=Ot.length;jt<Mt;jt++){let $t=Ot[jt];zo(Ht,At,V,$t)}_t&&g.render(V);for(let jt=0,Mt=Ot.length;jt<Mt;jt++){let $t=Ot[jt];Eo(x,V,$t,$t.viewport)}}else At.length>0&&zo(Ht,At,V,v),_t&&g.render(V),Eo(x,V,v)}et!==null&&E===0&&(Ut.updateMultisampleRenderTarget(et),Ut.updateRenderTargetMipmap(et)),k&&L.end(j),V.isScene===!0&&V.onAfterRender(j,V,v),ot.resetDefaultState(),D=-1,J=null,y.pop(),y.length>0?(P=y[y.length-1],Ut.setTextureUnits(P.state.textureUnits),at===!0&&Q.setGlobalState(j.clippingPlanes,P.state.camera)):P=null,I.pop(),I.length>0?x=I[I.length-1]:x=null,z!==null&&z.renderEnd()};function sc(V,v,M,k){if(V.visible===!1)return;if(V.layers.test(v.layers)){if(V.isGroup)M=V.renderOrder;else if(V.isLOD)V.autoUpdate===!0&&V.update(v);else if(V.isLight)P.pushLight(V),V.castShadow&&P.pushShadow(V);else if(V.isSprite){let Ht=v.isArrayCamera?st:tt;if(!V.frustumCulled||V.intersectsFrustum(Ht)){k&&gt.setFromMatrixPosition(V.matrixWorld).applyMatrix4(ut);let At=it.update(V),Ot=V.material;Ot.visible&&x.push(V,At,Ot,M,gt.z,null,v)}}else if(V.isMesh||V.isLine||V.isPoints){let Ht=v.isArrayCamera?st:tt;if(!V.frustumCulled||V.intersectsFrustum(Ht)){let At=it.update(V),Ot=V.material;if(k&&(V.boundingSphere!==void 0?(V.boundingSphere===null&&V.computeBoundingSphere(),gt.copy(V.boundingSphere.center)):(At.boundingSphere===null&&At.computeBoundingSphere(),gt.copy(At.boundingSphere.center)),gt.applyMatrix4(V.matrixWorld).applyMatrix4(ut)),Array.isArray(Ot)){let jt=At.groups;for(let Mt=0,$t=jt.length;Mt<$t;Mt++){let Pt=jt[Mt],te=Ot[Pt.materialIndex];te&&te.visible&&x.push(V,At,te,M,gt.z,Pt,v)}}else Ot.visible&&x.push(V,At,Ot,M,gt.z,null,v)}}}let It=V.children;for(let Ht=0,At=It.length;Ht<At;Ht++)sc(It[Ht],v,M,k)}function Eo(V,v,M,k){let{opaque:U,transmissive:It,transparent:Ht}=V;P.setupLightsView(M),at===!0&&Q.setGlobalState(j.clippingPlanes,M),k&&ft.viewport(_.copy(k)),U.length>0&&ea(U,v,M),It.length>0&&ea(It,v,M),Ht.length>0&&ea(Ht,v,M),ft.buffers.depth.setTest(!0),ft.buffers.depth.setMask(!0),ft.buffers.color.setMask(!0),ft.setPolygonOffset(!1)}function zo(V,v,M,k){if((M.isScene===!0?M.overrideMaterial:null)!==null)return;if(P.state.transmissionRenderTarget[k.id]===void 0){let Pt=Qt.has("EXT_color_buffer_half_float")||Qt.has("EXT_color_buffer_float");P.state.transmissionRenderTarget[k.id]=new Be(1,1,{generateMipmaps:!0,type:Pt?ai:De,minFilter:vi,samples:Math.max(4,ue.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ee.workingColorSpace})}let It=P.state.transmissionRenderTarget[k.id],Ht=k.viewport||_;It.setSize(Ht.z*j.transmissionResolutionScale,Ht.w*j.transmissionResolutionScale);let At=j.getRenderTarget(),Ot=j.getActiveCubeFace(),jt=j.getActiveMipmapLevel();j.setRenderTarget(It),j.getClearColor(F),ht=j.getClearAlpha(),ht<1&&j.setClearColor(16777215,.5),j.clear(),_t&&g.render(M);let Mt=j.toneMapping;j.toneMapping=hi;let $t=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),P.setupLightsView(k),at===!0&&Q.setGlobalState(j.clippingPlanes,k),ea(V,M,k),Ut.updateMultisampleRenderTarget(It),Ut.updateRenderTargetMipmap(It),Qt.has("WEBGL_multisampled_render_to_texture")===!1){let Pt=!1;for(let te=0,Ve=v.length;te<Ve;te++){let de=v[te],{object:le,geometry:ve,material:xt,group:we}=de;if(xt.side===Ii&&le.layers.test(k.layers)){let re=xt.side;xt.side=je,xt.needsUpdate=!0,ko(le,M,k,ve,xt,we),xt.side=re,xt.needsUpdate=!0,Pt=!0}}Pt===!0&&(Ut.updateMultisampleRenderTarget(It),Ut.updateRenderTargetMipmap(It))}j.setRenderTarget(At,Ot,jt),j.setClearColor(F,ht),$t!==void 0&&(k.viewport=$t),j.toneMapping=Mt}function ea(V,v,M){let k=v.isScene===!0?v.overrideMaterial:null;for(let U=0,It=V.length;U<It;U++){let Ht=V[U],{object:At,geometry:Ot,group:jt}=Ht,Mt=Ht.material;Mt.allowOverride===!0&&k!==null&&(Mt=k),At.layers.test(M.layers)&&ko(At,v,M,Ot,Mt,jt)}}function ko(V,v,M,k,U,It){z!==null&&U.isNodeMaterial&&z.setObject(V,U),V.onBeforeRender(j,v,M,k,U,It),V.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,V.matrixWorld),V.normalMatrix.getNormalMatrix(V.modelViewMatrix),U.onBeforeRender(j,v,M,k,V,It),U.transparent===!0&&U.side===Ii&&U.forceSinglePass===!1?(U.side=je,U.needsUpdate=!0,j.renderBufferDirect(M,v,k,U,V,It),U.side=Ci,U.needsUpdate=!0,j.renderBufferDirect(M,v,k,U,V,It),U.side=Ii):j.renderBufferDirect(M,v,k,U,V,It),V.onAfterRender(j,v,M,k,U,It)}function wo(V){let v=0;for(let M of V)M.texture!==null&&v++;return v}function _n(V,v,M){v.isScene!==!0&&(v=Jt);let k=Et.get(V),U=P.state.lights,It=P.state.shadowsArray,Ht=U.state.version,At=$.getParameters(V,U.state,It,v,M,P.state.lightProbeGridArray),Ot=$.getProgramCacheKey(At),jt=k.programs;k.environment=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?v.environment:null,k.fog=v.fog;let Mt=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap;k.envMap=S.get(V.envMap||k.environment,Mt),k.envMapRotation=k.environment!==null&&V.envMap===null?v.environmentRotation:V.envMapRotation,jt===void 0&&(V.addEventListener("dispose",se),jt=new Map,k.programs=jt,k.programVariants=new Map);let $t=jt.get(Ot);if($t!==void 0){if(k.currentProgram===$t&&k.lightsStateVersion===Ht)return Do(V,At),$t}else At.uniforms=$.getUniforms(V),z!==null&&V.isNodeMaterial&&z.build(V,M,At),V.onBeforeCompile(At,j),$t=$.acquireProgram(At,Ot),jt.set(Ot,$t),k.uniforms=At.uniforms;let Pt=k.uniforms;return(!V.isShaderMaterial&&!V.isRawShaderMaterial||V.clipping===!0)&&(Pt.clippingPlanes=Q.uniform),Do(V,At),k.needsLights=Ql(V),k.lightsStateVersion=Ht,k.needsLights&&(Pt.ambientLightColor.value=U.state.ambient,Pt.lightProbe.value=U.state.probe,Pt.sunLights.value=U.state.sun,Pt.sunLightShadows.value=U.state.sunShadow,Pt.directionalLights.value=U.state.directional,Pt.directionalLightShadows.value=U.state.directionalShadow,Pt.spotLights.value=U.state.spot,Pt.spotLightShadows.value=U.state.spotShadow,Pt.rectAreaLights.value=U.state.rectArea,Pt.ltc_1.value=U.state.rectAreaLTC1,Pt.ltc_2.value=U.state.rectAreaLTC2,Pt.pointLights.value=U.state.point,Pt.pointLightShadows.value=U.state.pointShadow,Pt.hemisphereLights.value=U.state.hemi,Pt.sunShadowMatrix.value=U.state.sunShadowMatrix,Pt.sunShadowCascade.value=U.state.sunShadowCascade,Pt.directionalShadowMatrix.value=U.state.directionalShadowMatrix,Pt.spotLightMatrix.value=U.state.spotLightMatrix,Pt.spotLightMap.value=U.state.spotLightMap,Pt.pointShadowMatrix.value=U.state.pointShadowMatrix),k.numLightProbeGrids=wo(P.state.lightProbeGridArray),k.currentProgram=$t,k.uniformsList=null,$t}function Fl(V,v,M,k,U){let It=Et.get(V),Ht=It.currentProgram.id+","+k+","+U,At=It.programVariants.get(Ht);return At===void 0?(At=_n(V,v,M),It.programVariants.set(Ht,At)):(It.currentProgram=At,It.uniformsList=null,It.outputColorSpace=k,It.toneMapping=U),At}function Uo(V){if(V.uniformsList===null){let v=V.currentProgram.getUniforms();V.uniformsList=Cn.seqWithValue(v.seq,V.uniforms)}return V.uniformsList}function Do(V,v){let M=Et.get(V);M.outputColorSpace=v.outputColorSpace,M.batching=v.batching,M.batchingColor=v.batchingColor,M.instancing=v.instancing,M.instancingColor=v.instancingColor,M.instancingMorph=v.instancingMorph,M.skinning=v.skinning,M.morphTargets=v.morphTargets,M.morphNormals=v.morphNormals,M.morphColors=v.morphColors,M.morphTargetsCount=v.morphTargetsCount,M.numClippingPlanes=v.numClippingPlanes,M.numIntersection=v.numClipIntersection,M.vertexAlphas=v.vertexAlphas,M.vertexTangents=v.vertexTangents,M.toneMapping=v.toneMapping}function Cl(V,v,M,k,U){v.isScene!==!0&&(v=Jt),Ut.resetTextureUnits();let It=v.fog,Ht=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?v.environment:null,At=et===null?j.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:ee.workingColorSpace,Ot=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,jt=S.get(k.envMap||Ht,Ot),Mt=k.vertexColors===!0&&!!M.attributes.color&&M.attributes.color.itemSize===4,$t=!!M.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Pt=!!M.morphAttributes.position,te=!!M.morphAttributes.normal,Ve=!!M.morphAttributes.color,de=hi;k.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(de=j.toneMapping);let le=M.morphAttributes.position||M.morphAttributes.normal||M.morphAttributes.color,ve=le!==void 0?le.length:0,xt=Et.get(k),we=P.state.lights;if(at===!0&&(yt===!0||V!==J)){let fe=V===J&&k.id===D;Q.setState(k,V,fe)}let re=!1,Yi=!1;k.version===xt.__version?xt.needsLights&&xt.lightsStateVersion!==we.state.version||U.isBatchedMesh&&xt.batching===!1||!U.isBatchedMesh&&xt.batching===!0||U.isBatchedMesh&&xt.batchingColor===!0&&U._colorsTexture===null||U.isBatchedMesh&&xt.batchingColor===!1&&U._colorsTexture!==null||U.isInstancedMesh&&xt.instancing===!1||!U.isInstancedMesh&&xt.instancing===!0||U.isSkinnedMesh&&xt.skinning===!1||!U.isSkinnedMesh&&xt.skinning===!0||U.isInstancedMesh&&xt.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&xt.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&xt.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&xt.instancingMorph===!1&&U.morphTexture!==null||xt.envMap!==jt||k.fog===!0&&xt.fog!==It||xt.numClippingPlanes!==void 0&&(xt.numClippingPlanes!==Q.numPlanes||xt.numIntersection!==Q.numIntersection)||xt.vertexAlphas!==Mt||xt.vertexTangents!==$t||xt.morphTargets!==Pt||xt.morphNormals!==te||xt.morphColors!==Ve||xt.morphTargetsCount!==ve||xt.numLightProbeGrids!==wo(P.state.lightProbeGridArray)?re=!0:(xt.outputColorSpace!==At||xt.toneMapping!==de)&&(Yi=!0):(re=!0,xt.__version=k.version);let Te=xt.currentProgram;(re===!0||Yi===!0)&&(Te=Yi===!0?Fl(k,v,U,At,de):_n(k,v,U),z&&k.isNodeMaterial&&z.onUpdateProgram(k,Te,xt));let ia=!1,Li=!1,_i=!1,ie=Te.getUniforms(),ge=xt.uniforms;if(ft.useProgram(Te.program)&&(ia=!0,Li=!0,_i=!0),k.id!==D&&(D=k.id,Li=!0),ia||J!==V){ft.buffers.depth.getReversed()&&V.reversedDepth!==!0&&(V._reversedDepth=!0,V.updateProjectionMatrix()),ie.setValue(T,"projectionMatrix",V.projectionMatrix),ie.setValue(T,"viewMatrix",V.matrixWorldInverse);let He=ie.map.cameraPosition;He!==void 0&&He.setValue(T,wt.setFromMatrixPosition(V.matrixWorld)),ue.logarithmicDepthBuffer&&ie.setValue(T,"logDepthBufFC",2/(Math.log(V.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&ie.setValue(T,"isOrthographic",V.isOrthographicCamera===!0),J!==V&&(J=V,Li=!0,_i=!0)}if(xt.needsLights&&(we.state.sunShadowMap.length>0&&ie.setValue(T,"sunShadowMap",we.state.sunShadowMap,Ut),we.state.directionalShadowMap.length>0&&ie.setValue(T,"directionalShadowMap",we.state.directionalShadowMap,Ut),we.state.spotShadowMap.length>0&&ie.setValue(T,"spotShadowMap",we.state.spotShadowMap,Ut),we.state.pointShadowMap.length>0&&ie.setValue(T,"pointShadowMap",we.state.pointShadowMap,Ut)),U.isSkinnedMesh){ie.setOptional(T,U,"bindMatrix"),ie.setOptional(T,U,"bindMatrixInverse");let fe=U.skeleton;fe&&(fe.boneTexture===null&&fe.computeBoneTexture(),ie.setValue(T,"boneTexture",fe.boneTexture,Ut))}U.isBatchedMesh&&(ie.setOptional(T,U,"batchingTexture"),ie.setValue(T,"batchingTexture",U._matricesTexture,Ut),ie.setOptional(T,U,"batchingIdTexture"),ie.setValue(T,"batchingIdTexture",U._indirectTexture,Ut),ie.setOptional(T,U,"batchingColorTexture"),U._colorsTexture!==null&&ie.setValue(T,"batchingColorTexture",U._colorsTexture,Ut));let Ye=M.morphAttributes;if((Ye.position!==void 0||Ye.normal!==void 0||Ye.color!==void 0)&&Y.update(U,M,Te),(Li||xt.receiveShadow!==U.receiveShadow)&&(xt.receiveShadow=U.receiveShadow,ie.setValue(T,"receiveShadow",U.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&v.environment!==null&&(ge.envMapIntensity.value=v.environmentIntensity),ge.dfgLUT!==void 0&&(ge.dfgLUT.value=F1()),Li){if(ie.setValue(T,"toneMappingExposure",j.toneMappingExposure),xt.needsLights&&Jl(ge,_i),It&&k.fog===!0&&ct.refreshFogUniforms(ge,It),ct.refreshMaterialUniforms(ge,k,pt,vt,P.state.transmissionRenderTarget[V.id]),xt.needsLights&&xt.numLightProbeGrids>0){let fe=b,He=0;for(let mi of P.state.lightProbeGridArray)mi.texture!==null&&(fe.textures[He]=mi.texture,fe.min[He]=mi.boundingBox.min,fe.max[He]=mi.boundingBox.max,fe.resolution[He]=mi.resolution,He++);for(let mi in fe)fe[mi].length=He;ge.probesSH.value=fe.textures,ge.probesMin.value=fe.min,ge.probesMax.value=fe.max,ge.probesResolution.value=fe.resolution}Cn.upload(T,Uo(xt),ge,Ut)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Cn.upload(T,Uo(xt),ge,Ut),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&ie.setValue(T,"center",U.center),ie.setValue(T,"modelViewMatrix",U.modelViewMatrix),ie.setValue(T,"normalMatrix",U.normalMatrix),ie.setValue(T,"modelMatrix",U.matrixWorld),k.uniformsGroups!==void 0){let fe=k.uniformsGroups;for(let He=0,mi=fe.length;He<mi;He++){let Mo=fe[He];Tt.update(Mo,Te),Tt.bind(Mo,Te)}}return Te}function Jl(V,v){V.ambientLightColor.needsUpdate=v,V.lightProbe.needsUpdate=v,V.sunLights.needsUpdate=v,V.sunLightShadows.needsUpdate=v,V.directionalLights.needsUpdate=v,V.directionalLightShadows.needsUpdate=v,V.pointLights.needsUpdate=v,V.pointLightShadows.needsUpdate=v,V.spotLights.needsUpdate=v,V.spotLightShadows.needsUpdate=v,V.rectAreaLights.needsUpdate=v,V.hemisphereLights.needsUpdate=v}function Ql(V){return V.isMeshLambertMaterial||V.isMeshToonMaterial||V.isMeshPhongMaterial||V.isMeshStandardMaterial||V.isShadowMaterial||V.isShaderMaterial&&V.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return et},this.setRenderTargetTextures=function(V,v,M){let k=Et.get(V);k.__autoAllocateDepthBuffer=V.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),Et.get(V.texture).__webglTexture=v,Et.get(V.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:M,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(V,v){let M=Et.get(V);M.__webglFramebuffer=v,M.__useDefaultFramebuffer=v===void 0},this.setRenderTarget=function(V,v=0,M=0){et=V,B=v,E=M;let k=null,U=!1,It=!1;if(V){let At=Et.get(V);if(At.__useDefaultFramebuffer!==void 0){ft.bindFramebuffer(T.FRAMEBUFFER,At.__webglFramebuffer),_.copy(V.viewport),Vt.copy(V.scissor),Wt=V.scissorTest,ft.viewport(_),ft.scissor(Vt),ft.setScissorTest(Wt),D=-1;return}else if(At.__webglFramebuffer===void 0)Ut.setupRenderTarget(V);else if(At.__hasExternalTextures)Ut.rebindTextures(V,Et.get(V.texture).__webglTexture,Et.get(V.depthTexture).__webglTexture);else if(V.depthBuffer){let Mt=V.depthTexture;if(At.__boundDepthTexture!==Mt){if(Mt!==null&&Et.has(Mt)&&(V.width!==Mt.image.width||V.height!==Mt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Ut.setupDepthRenderbuffer(V)}}let Ot=V.texture;(Ot.isData3DTexture||Ot.isDataArrayTexture||Ot.isCompressedArrayTexture)&&(It=!0);let jt=Et.get(V).__webglFramebuffer;V.isWebGLCubeRenderTarget?(Array.isArray(jt[v])?k=jt[v][M]:k=jt[v],U=!0):V.samples>0&&Ut.useMultisampledRTT(V)===!1?k=Et.get(V).__webglMultisampledFramebuffer:Array.isArray(jt)?k=jt[M]:k=jt,_.copy(V.viewport),Vt.copy(V.scissor),Wt=V.scissorTest}else _.copy(Xt).multiplyScalar(pt).floor(),Vt.copy(Zt).multiplyScalar(pt).floor(),Wt=Ct;if(M!==0&&(k=G),ft.bindFramebuffer(T.FRAMEBUFFER,k)&&ft.drawBuffers(V,k),ft.viewport(_),ft.scissor(Vt),ft.setScissorTest(Wt),U){let At=Et.get(V.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_CUBE_MAP_POSITIVE_X+v,At.__webglTexture,M)}else if(It){let At=v;for(let Ot=0;Ot<V.textures.length;Ot++){let jt=Et.get(V.textures[Ot]);T.framebufferTextureLayer(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0+Ot,jt.__webglTexture,M,At)}}else if(V!==null&&M!==0){let At=Et.get(V.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,At.__webglTexture,M)}D=-1};function Zo(V){let v=Et.get(V);return(v.__readFormat!==V.format||v.__readType!==V.type)&&(v.__readFormat=V.format,v.__readType=V.type,v.__formatReadable=ue.textureFormatReadable(V.format),v.__typeReadable=ue.textureTypeReadable(V.type)),v}this.readRenderTargetPixels=function(V,v,M,k,U,It,Ht,At=0){if(!(V&&V.isWebGLRenderTarget)){kt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ot=Et.get(V).__webglFramebuffer;if(V.isWebGLCubeRenderTarget&&Ht!==void 0&&(Ot=Ot[Ht],Array.isArray(Ot)&&(Ot=Ot[0])),Ot){ft.bindFramebuffer(T.FRAMEBUFFER,Ot);try{let jt=V.textures[At],Mt=jt.format,$t=jt.type;V.textures.length>1&&T.readBuffer(T.COLOR_ATTACHMENT0+At);let Pt=Zo(jt);if(Pt.__formatReadable===!1){kt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Pt.__typeReadable===!1){kt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}v>=0&&v<=V.width-k&&M>=0&&M<=V.height-U&&T.readPixels(v,M,k,U,rt.convert(Mt),rt.convert($t),It)}finally{let jt=et!==null?Et.get(et).__webglFramebuffer:null;ft.bindFramebuffer(T.FRAMEBUFFER,jt)}}},this.readRenderTargetPixelsAsync=async function(V,v,M,k,U,It,Ht,At=0){if(!(V&&V.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ot=Et.get(V).__webglFramebuffer;if(V.isWebGLCubeRenderTarget&&Ht!==void 0&&(Ot=Ot[Ht],Array.isArray(Ot)&&(Ot=Ot[0])),Ot)if(v>=0&&v<=V.width-k&&M>=0&&M<=V.height-U){ft.bindFramebuffer(T.FRAMEBUFFER,Ot);let jt=V.textures[At],Mt=jt.format,$t=jt.type;V.textures.length>1&&T.readBuffer(T.COLOR_ATTACHMENT0+At);let Pt=Zo(jt);if(Pt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Pt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let te=T.createBuffer();T.bindBuffer(T.PIXEL_PACK_BUFFER,te),T.bufferData(T.PIXEL_PACK_BUFFER,It.byteLength,T.STREAM_READ),T.readPixels(v,M,k,U,rt.convert(Mt),rt.convert($t),0),T.bindBuffer(T.PIXEL_PACK_BUFFER,null);let Ve=et!==null?Et.get(et).__webglFramebuffer:null;ft.bindFramebuffer(T.FRAMEBUFFER,Ve);let de=T.fenceSync(T.SYNC_GPU_COMMANDS_COMPLETE,0);return T.flush(),await nl(T,de,4),T.bindBuffer(T.PIXEL_PACK_BUFFER,te),T.getBufferSubData(T.PIXEL_PACK_BUFFER,0,It),T.bindBuffer(T.PIXEL_PACK_BUFFER,null),T.deleteBuffer(te),T.deleteSync(de),It}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(V,v=null,M=0){let k=Math.pow(2,-M),U=Math.floor(V.image.width*k),It=Math.floor(V.image.height*k),Ht=v!==null?v.x:0,At=v!==null?v.y:0;Ut.setTexture2D(V,0),T.copyTexSubImage2D(T.TEXTURE_2D,M,0,0,Ht,At,U,It),ft.unbindTexture()},this.copyTextureToTexture=function(V,v,M=null,k=null,U=0,It=0){let Ht,At,Ot,jt,Mt,$t,Pt,te,Ve,de=V.isCompressedTexture?V.mipmaps[It]:V.image;if(M!==null)Ht=M.max.x-M.min.x,At=M.max.y-M.min.y,Ot=M.isBox3?M.max.z-M.min.z:1,jt=M.min.x,Mt=M.min.y,$t=M.isBox3?M.min.z:0;else{let ie=Math.pow(2,-U);Ht=Math.floor(de.width*ie),At=Math.floor(de.height*ie),V.isDataArrayTexture?Ot=de.depth:V.isData3DTexture?Ot=Math.floor(de.depth*ie):Ot=1,jt=0,Mt=0,$t=0}k!==null?(Pt=k.x,te=k.y,Ve=k.z):(Pt=0,te=0,Ve=0);let le=rt.convert(v.format),ve=rt.convert(v.type),xt;v.isData3DTexture?(Ut.setTexture3D(v,0),xt=T.TEXTURE_3D):v.isDataArrayTexture||v.isCompressedArrayTexture?(Ut.setTexture2DArray(v,0),xt=T.TEXTURE_2D_ARRAY):(Ut.setTexture2D(v,0),xt=T.TEXTURE_2D),ft.activeTexture(T.TEXTURE0),ft.pixelStorei(T.UNPACK_FLIP_Y_WEBGL,v.flipY),ft.pixelStorei(T.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),ft.pixelStorei(T.UNPACK_ALIGNMENT,v.unpackAlignment);let we=ft.getParameter(T.UNPACK_ROW_LENGTH),re=ft.getParameter(T.UNPACK_IMAGE_HEIGHT),Yi=ft.getParameter(T.UNPACK_SKIP_PIXELS),Te=ft.getParameter(T.UNPACK_SKIP_ROWS),ia=ft.getParameter(T.UNPACK_SKIP_IMAGES);ft.pixelStorei(T.UNPACK_ROW_LENGTH,de.width),ft.pixelStorei(T.UNPACK_IMAGE_HEIGHT,de.height),ft.pixelStorei(T.UNPACK_SKIP_PIXELS,jt),ft.pixelStorei(T.UNPACK_SKIP_ROWS,Mt),ft.pixelStorei(T.UNPACK_SKIP_IMAGES,$t);let Li=V.isDataArrayTexture||V.isData3DTexture,_i=v.isDataArrayTexture||v.isData3DTexture;if(V.isDepthTexture){let ie=Et.get(V),ge=Et.get(v),Ye=Et.get(ie.__renderTarget),fe=Et.get(ge.__renderTarget);ft.bindFramebuffer(T.READ_FRAMEBUFFER,Ye.__webglFramebuffer),ft.bindFramebuffer(T.DRAW_FRAMEBUFFER,fe.__webglFramebuffer);for(let He=0;He<Ot;He++)Li&&(T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,Et.get(V).__webglTexture,U,$t+He),T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,Et.get(v).__webglTexture,It,Ve+He)),T.blitFramebuffer(jt,Mt,jt+Ht,Mt+At,Pt,te,Pt+Ht,te+At,T.DEPTH_BUFFER_BIT,T.NEAREST);ft.bindFramebuffer(T.READ_FRAMEBUFFER,null),ft.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else if(U!==0||V.isRenderTargetTexture||Et.has(V)){let ie=Et.get(V),ge=Et.get(v);ft.bindFramebuffer(T.READ_FRAMEBUFFER,W),ft.bindFramebuffer(T.DRAW_FRAMEBUFFER,Z);for(let Ye=0;Ye<Ot;Ye++)Li?T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,ie.__webglTexture,U,$t+Ye):T.framebufferTexture2D(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,ie.__webglTexture,U),_i?T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,ge.__webglTexture,It,Ve+Ye):T.framebufferTexture2D(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,ge.__webglTexture,It),U!==0?T.blitFramebuffer(jt,Mt,jt+Ht,Mt+At,Pt,te,Pt+Ht,te+At,T.COLOR_BUFFER_BIT,T.NEAREST):_i?T.copyTexSubImage3D(xt,It,Pt,te,Ve+Ye,jt,Mt,Ht,At):T.copyTexSubImage2D(xt,It,Pt,te,jt,Mt,Ht,At);ft.bindFramebuffer(T.READ_FRAMEBUFFER,null),ft.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else _i?V.isDataTexture||V.isData3DTexture?T.texSubImage3D(xt,It,Pt,te,Ve,Ht,At,Ot,le,ve,de.data):v.isCompressedArrayTexture?T.compressedTexSubImage3D(xt,It,Pt,te,Ve,Ht,At,Ot,le,de.data):T.texSubImage3D(xt,It,Pt,te,Ve,Ht,At,Ot,le,ve,de):V.isDataTexture?T.texSubImage2D(T.TEXTURE_2D,It,Pt,te,Ht,At,le,ve,de.data):V.isCompressedTexture?T.compressedTexSubImage2D(T.TEXTURE_2D,It,Pt,te,de.width,de.height,le,de.data):T.texSubImage2D(T.TEXTURE_2D,It,Pt,te,Ht,At,le,ve,de);ft.pixelStorei(T.UNPACK_ROW_LENGTH,we),ft.pixelStorei(T.UNPACK_IMAGE_HEIGHT,re),ft.pixelStorei(T.UNPACK_SKIP_PIXELS,Yi),ft.pixelStorei(T.UNPACK_SKIP_ROWS,Te),ft.pixelStorei(T.UNPACK_SKIP_IMAGES,ia),It===0&&v.generateMipmaps===!0&&v.mipmapsAutoUpdate===!0&&T.generateMipmap(xt),ft.unbindTexture()},this.initRenderTarget=function(V){Et.get(V).__webglFramebuffer===void 0&&Ut.setupRenderTarget(V)},this.initTexture=function(V){V.isCubeTexture?Ut.setTextureCube(V,0):V.isData3DTexture?Ut.setTexture3D(V,0):V.isDataArrayTexture||V.isCompressedArrayTexture?Ut.setTexture2DArray(V,0):Ut.setTexture2D(V,0),ft.unbindTexture()},this.resetState=function(){B=0,E=0,et=null,ft.reset(),ot.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ce}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=ee._getDrawingBufferColorSpace(t),e.unpackColorSpace=ee._getUnpackColorSpace()}};var ta=new X;function Qe(n,t,e,i,r,a){let s=2*Math.PI*r/4,c=Math.max(a-2*r,0),u=Math.PI/4;ta.copy(t),ta[i]=0,ta.normalize();let o=.5*s/(s+c),l=1-ta.angleTo(n)/u;return Math.sign(ta[e])===1?l*o:c/(s+c)+o+o*(1-l)}var nc=class n extends pi{constructor(t=1,e=1,i=1,r=2,a=.1){let s=r*2+1;if(a=Math.min(t/2,e/2,i/2,a),super(1,1,1,s,s,s),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:i,segments:r,radius:a},s===1)return;let c=this.toNonIndexed();this.index=null,this.attributes.position=c.attributes.position,this.attributes.normal=c.attributes.normal,this.attributes.uv=c.attributes.uv;let u=new X,o=new X,l=new X(t,e,i).divideScalar(2).subScalar(a),p=this.attributes.position.array,d=this.attributes.normal.array,A=this.attributes.uv.array,h=p.length/6,m=new X,f=.5/s;for(let R=0,O=0;R<p.length;R+=3,O+=2)switch(u.fromArray(p,R),o.copy(u),o.x-=Math.sign(o.x)*f,o.y-=Math.sign(o.y)*f,o.z-=Math.sign(o.z)*f,o.normalize(),p[R+0]=l.x*Math.sign(u.x)+o.x*a,p[R+1]=l.y*Math.sign(u.y)+o.y*a,p[R+2]=l.z*Math.sign(u.z)+o.z*a,d[R+0]=o.x,d[R+1]=o.y,d[R+2]=o.z,Math.floor(R/h)){case 0:m.set(1,0,0),A[O+0]=Qe(m,o,"z","y",a,i),A[O+1]=1-Qe(m,o,"y","z",a,e);break;case 1:m.set(-1,0,0),A[O+0]=1-Qe(m,o,"z","y",a,i),A[O+1]=1-Qe(m,o,"y","z",a,e);break;case 2:m.set(0,1,0),A[O+0]=1-Qe(m,o,"x","z",a,t),A[O+1]=Qe(m,o,"z","x",a,i);break;case 3:m.set(0,-1,0),A[O+0]=1-Qe(m,o,"x","z",a,t),A[O+1]=1-Qe(m,o,"z","x",a,i);break;case 4:m.set(0,0,1),A[O+0]=1-Qe(m,o,"x","y",a,t),A[O+1]=1-Qe(m,o,"y","x",a,e);break;case 5:m.set(0,0,-1),A[O+0]=Qe(m,o,"x","y",a,t),A[O+1]=1-Qe(m,o,"y","x",a,e);break}}static fromJSON(t){return new n(t.width,t.height,t.depth,t.segments,t.radius)}};var rc=class extends sn{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let t=new pi;t.deleteAttribute("uv");let e=new Ri({side:je}),i=new Ri,r=new kr(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);let a=new he(t,e);a.position.set(-.757,13.219,.717),a.scale.set(31.713,28.305,28.591),this.add(a);let s=new hr(t,i,6),c=new We;c.position.set(-10.906,2.009,1.846),c.rotation.set(0,-.195,0),c.scale.set(2.328,7.905,4.651),c.updateMatrix(),s.setMatrixAt(0,c.matrix),c.position.set(-5.607,-.754,-.758),c.rotation.set(0,.994,0),c.scale.set(1.97,1.534,3.955),c.updateMatrix(),s.setMatrixAt(1,c.matrix),c.position.set(6.167,.857,7.803),c.rotation.set(0,.561,0),c.scale.set(3.927,6.285,3.687),c.updateMatrix(),s.setMatrixAt(2,c.matrix),c.position.set(-2.017,.018,6.124),c.rotation.set(0,.333,0),c.scale.set(2.002,4.566,2.064),c.updateMatrix(),s.setMatrixAt(3,c.matrix),c.position.set(2.291,-.756,-2.621),c.rotation.set(0,-.286,0),c.scale.set(1.546,1.552,1.496),c.updateMatrix(),s.setMatrixAt(4,c.matrix),c.position.set(-2.193,-.369,-5.547),c.rotation.set(0,.516,0),c.scale.set(3.875,3.487,2.986),c.updateMatrix(),s.setMatrixAt(5,c.matrix),this.add(s);let u=new he(t,Yn(50));u.position.set(-16.116,14.37,8.208),u.scale.set(.1,2.428,2.739),this.add(u);let o=new he(t,Yn(50));o.position.set(-16.109,18.021,-8.207),o.scale.set(.1,2.425,2.751),this.add(o);let l=new he(t,Yn(17));l.position.set(14.904,12.198,-1.832),l.scale.set(.15,4.265,6.331),this.add(l);let p=new he(t,Yn(43));p.position.set(-.462,8.89,14.52),p.scale.set(4.38,5.441,.088),this.add(p);let d=new he(t,Yn(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);let A=new he(t,Yn(100));A.position.set(0,20,0),A.scale.set(1,.1,1),this.add(A)}dispose(){let t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(let e of t)e.dispose()}};function Yn(n){return new Nr({color:0,emissive:16777215,emissiveIntensity:n})}var To=[new URL("screen-1.jpg",document.currentScript.src).href,new URL("screen-2.jpg",document.currentScript.src).href,new URL("screen-3.jpg",document.currentScript.src).href];window.buildMonitor=async function(){let n=new tc({antialias:!0,alpha:!0,powerPreference:"high-performance"});n.setClearColor(0,0);let t=new sn,e=new Ee(24,1120/818,.1,80);e.position.set(0,3.24,14.1),e.lookAt(0,2.26,0);let i=new Jn(n);t.environment=i.fromScene(new rc,.035).texture;let r=new Pi;t.add(r);let a=new Ri({color:13093323,metalness:.92,roughness:.28}),s=new Tr({color:1316120,metalness:.32,roughness:.12,clearcoat:1}),c=new Ri({color:2237482,roughness:.46});function u(E,et,D,J,_){let Vt=new he(E,et);return Vt.position.set(D,J,_),r.add(Vt),Vt}function o(E,et,D,J,_,Vt,Wt,F){return u(new nc(E,et,D,4,J),_,Vt,Wt,F)}o(8.48,4.24,.22,.075,a,0,2.94,0),o(8.465,4.23,.027,.012,s,0,2.94,.117);let l=await new Dn().loadAsync(To[0]);l.colorSpace=Le,l.anisotropy=n.capabilities.getMaxAnisotropy();let p=u(new Bi(8.23,3.984),new cn({map:l}),0,2.94,.132),d=document.createElement("canvas");d.width=d.height=1024;let A=d.getContext("2d");A.scale(1024/24,1024/24),A.fillStyle="#26272a",A.fill(new Path2D("M17.1 1.1c.2 2.5-1.9 4.9-4.4 4.9-.3-2.4 2-4.7 4.4-4.9z M20.9 8.2c-2.9 1.6-3.2 5.9.5 7.6-.6 1.8-2.7 6.1-4.9 6.1-1.3 0-2-1-3.7-1s-2.6 1-3.8 1C6.5 22 3.4 16.6 3.4 12c0-3.4 2-6.2 5.2-6.2 1.7 0 2.8 1 4.1 1 1.2 0 2.7-1.2 4.3-1.1 1.7.1 3 .8 3.9 2.5z"));let h=new Vr(d),m=u(new Bi(.77,.83),new cn({map:h,transparent:!0,depthWrite:!1}),0,3.39,-.112);m.rotation.y=Math.PI;let f=new kn;f.moveTo(-.74,0),f.lineTo(.74,0),f.lineTo(.74,1.98),f.quadraticCurveTo(.74,2.04,.68,2.04),f.lineTo(-.68,2.04),f.quadraticCurveTo(-.74,2.04,-.74,1.98),f.closePath();let R=new on;R.absellipse(0,1.36,.19,.235,0,2*Math.PI,!0,0),f.holes.push(R);let O=u(new vr(f,{depth:.066,bevelThickness:.025,bevelSize:.023,bevelSegments:4,curveSegments:32}),a,0,.095,-.83);O.scale.y=.76,O.rotation.x=.32,o(1.56,.095,1.67,.044,a,0,.067,-.13),o(1.45,.025,1.52,.01,c,0,.013,-.13);let H=u(new Or(.18,.18,1.34,48),a,0,1.63,-.28);H.rotation.z=Math.PI/2;for(let E=0;E<4;E++)o(.046,.13,.012,.005,c,1.66+E*.145,1.11,-.112);u(new yr(.023,24),c,0,4.996,.133);let b=new Ur(16774630,2);b.position.set(-4,7,5),t.add(b),t.environmentIntensity=.73;let x=[l],P=0,I=document.querySelector(".monitor-stage"),y=n.domElement;y.setAttribute("aria-hidden","true"),Object.assign(y.style,{position:"absolute",inset:"0",width:"100%",height:"100%",pointerEvents:"none"}),I.append(y);let L=document.querySelector(".monitor-heading"),j=document.querySelector(".monitor-caption"),N,z;function G(){n.setPixelRatio(Math.min(devicePixelRatio||1,2,Math.sqrt(32e5/(I.clientWidth*I.clientHeight)))),n.setSize(I.clientWidth,I.clientHeight,!1),e.aspect=I.clientWidth/I.clientHeight;let E=I.getBoundingClientRect(),et=L.getBoundingClientRect().bottom-E.top+10,D=j.getBoundingClientRect().top-E.top-10;N=Math.max(1,D-et)/E.height,z=(et+D)/2/E.height}G();let W=new ResizeObserver(()=>{G(),window.dispatchEvent(new Event("monitorinvalidate"))});W.observe(I),W.observe(L),W.observe(j);let Z=[];for(let[E,et,D,J]of[[8.52,.8,5.09,.16],[1.6,0,1.85,1]])for(let _ of[-E/2,E/2])for(let Vt of[et,D])for(let Wt of[-J,J])Z.push(new X(_,Vt,Wt));let B=new X;return function(et,D,J){D!==P&&(P=D,x[D]||=new Dn().load(To[D],()=>window.dispatchEvent(new Event("monitorinvalidate"))),x[D].colorSpace=Le,x[D].anisotropy=n.capabilities.getMaxAnisotropy(),p.material.map=x[D]),r.position.set(0,.62*J,8.4*J);let _=p.material.map;_.repeat.y=16/9*3.984/8.23,_.offset.y=(1-_.repeat.y)*.5,e.clearViewOffset(),e.zoom=1,e.updateProjectionMatrix(),e.updateMatrixWorld();function Vt(){r.updateMatrixWorld();let yt=1/0,ut=-1/0,wt=-1/0,gt=1/0;for(let Jt of Z)B.copy(Jt).applyMatrix4(r.matrixWorld).project(e),yt=Math.min(yt,B.x),ut=Math.max(ut,B.x),gt=Math.min(gt,B.y),wt=Math.max(wt,B.y);return{left:yt,right:ut,top:wt,bottom:gt}}r.position.set(0,.62,8.4),r.rotation.y=Math.PI;let Wt=Vt(),F=Math.min(1.98/(Wt.top-Wt.bottom),2.8/(Wt.right-Wt.left));r.position.set(0,.62*J,8.4*J),r.rotation.y=Math.PI*(1-et);let{left:ht,right:St,top:vt,bottom:pt}=Vt(),Nt=Math.min(1.94/(St-ht),1.94*N/(vt-pt)),oe=1-et*(1-N);e.zoom=Math.min(1.98*oe/(vt-pt),F+(Nt-F)*et);let Xt=I.clientWidth,Zt=I.clientHeight,Ct=(ht+St)*e.zoom*Xt/4,tt=Math.max(0,N-(vt-pt)*e.zoom/2),st=(.5-z)*et*Zt-(vt+pt)*e.zoom*Zt/4-tt*Zt*.42*et;e.setViewOffset(Xt,Zt,Ct,st,Xt,Zt);let at=yt=>(B.set(0,yt,0).applyMatrix4(r.matrixWorld).project(e),50-50*B.y+"%");B.set(-4.115,4.932,.132).applyMatrix4(r.matrixWorld).project(e);let _sl=50+50*B.x,_st=50-50*B.y;B.set(4.115,.948,.132).applyMatrix4(r.matrixWorld).project(e);let _sr=50+50*B.x,_sb=50-50*B.y;I.style.setProperty("--screen-left",Math.min(_sl,_sr)+"%"),I.style.setProperty("--screen-top",Math.min(_st,_sb)+"%"),I.style.setProperty("--screen-w",Math.abs(_sr-_sl)+"%"),I.style.setProperty("--screen-h",Math.abs(_sb-_st)+"%"),I.style.setProperty("--screen-y",at(2.94)),I.style.setProperty("--foot-y",at(0)),n.render(t,e)}};})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
