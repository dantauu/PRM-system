"use strict";(self.webpackChunkprm_all=self.webpackChunkprm_all||[]).push([[833],{2975:(e,t,a)=>{a.r(t),a.d(t,{default:()=>T});var r=a(5893),n=a(722),s=a(7456),l=a(8545),i=a(4082),o=a(3978),c=a(4190),d=a(7294),u=a(4051),m=a(1555),h=function(){return h=Object.assign||function(e){for(var t,a=1,r=arguments.length;a<r;a++)for(var n in t=arguments[a])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},h.apply(this,arguments)},p=[{value:10,text:"Показывать по 10 записей"},{value:25,text:"Показывать по 25 записей"},{value:50,text:"Показывать по 50 записей"}],f=function(){var e=(0,c.eY)(l.Wf.$items),t=!e.length,a=(0,i.QA)({columns:{base:"auto auto auto auto auto auto auto auto auto auto",tablet:"auto auto auto auto auto auto auto auto auto auto",mobile:"auto auto auto auto auto auto auto auto auto auto"},isNoData:t}),n=(0,d.useMemo)((function(){return{nodes:e.map((function(e){var t=e.userId,a=function(e,t){var a={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(a[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(r=Object.getOwnPropertySymbols(e);n<r.length;n++)t.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(a[r[n]]=e[r[n]])}return a}(e,["userId"]);return h({id:t},a)}))||[]}}),[e]);return(0,r.jsxs)(s.Xg.Cloud,{header:{title:"Моя команда"},children:[(0,r.jsx)(o.iA,{theme:a,layout:{custom:!0,horizontalScroll:!t},data:n,children:function(e){return t?(0,r.jsx)(s.J3,{}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(o.h4,{children:(0,r.jsxs)(o.VJ,{children:[(0,r.jsx)(o.qN,{children:"ФИО"}),(0,r.jsx)(o.qN,{children:"login"}),(0,r.jsx)(o.qN,{children:"Телефон"}),(0,r.jsx)(o.qN,{children:"Telegram"}),(0,r.jsx)(o.qN,{children:"Активен"}),(0,r.jsx)(o.qN,{children:"В первой линии"}),(0,r.jsx)(o.qN,{children:"В структуре"}),(0,r.jsx)(o.qN,{children:"Товарооборот"}),(0,r.jsx)(o.qN,{children:"Страна"}),(0,r.jsx)(o.qN,{children:"Город"})]})}),(0,r.jsx)(o.uT,{children:e.map((function(e){return(0,r.jsxs)(o.X2,{item:e,children:[(0,r.jsx)(o.bL,{children:"".concat(e.name," ").concat(e.surname)}),(0,r.jsx)(o.bL,{children:e.login}),(0,r.jsx)(o.bL,{children:e.phone}),(0,r.jsx)(o.bL,{children:e.telegram}),(0,r.jsx)(o.bL,{children:e.activeDate}),(0,r.jsx)(o.bL,{children:e.firstLine}),(0,r.jsx)(o.bL,{children:e.struct}),(0,r.jsx)(o.bL,{children:e.trade}),(0,r.jsx)(o.bL,{children:e.country}),(0,r.jsx)(o.bL,{children:e.city})]},e.id)}))})]})}}),(0,r.jsx)(u.Z,{style:{marginTop:"12px"},children:(0,r.jsx)(m.Z,{xs:12,md:6,lg:3,children:(0,r.jsx)(s.l0.Select,{size:"sm",items:p})})})]})},g=((0,d.memo)(f),a(1806)),x=a(7805),j=a(7019),v=a(6163),b=a(1753),N=a(8116),_=a(381),y=a.n(_),D=(0,N.ub)({effect:v.Bz.getReports}),C=(0,N.MT)(null),Y=(0,N.MT)([]),M=(0,N.MT)(y()().format("YYYY-MM-DD")),$=(0,N.MT)(y()().subtract(1,"months").format("YYYY-MM-DD")),w=(0,N.yM)(),I=(0,N.yM)(),X=(0,N.yM)();C.on(w,(function(e,t){return t})),Y.on(D.doneData,(function(e,t){return t})),$.on(I,(function(e,t){return t?(0,b.H)(t).format("YYYY-MM-DD"):(0,b.H)().format("YYYY-MM-DD")})),M.on(X,(function(e,t){return t?(0,b.H)(t).format("YYYY-MM-DD"):(0,b.H)().format("YYYY-MM-DD")}));var k=D.pending;(0,N.UP)({clock:w,source:{strategyId:C,startDate:$,endDate:M},filter:function(e){return!!e},fn:function(e){return{custom_strategy_id:e.strategyId,startDate:e.startDate,endDate:e.endDate}},target:D}),(0,N.UP)({clock:X,source:{strategyId:C,startDate:$,endDate:M},filter:function(e){return!!e},fn:function(e){return{custom_strategy_id:e.strategyId,startDate:e.startDate,endDate:e.endDate}},target:D}),(0,N.UP)({clock:I,source:{strategyId:C,startDate:$,endDate:M},filter:function(e){return!!e},fn:function(e){return{custom_strategy_id:e.strategyId,startDate:e.startDate,endDate:e.endDate}},target:D}),(0,N.UP)({clock:D.fail,fn:function(){return"Ошибка"},target:j.i.showDanger});var O={$strategyId:C,strategyIdChanged:w,$value:Y,$pending:k,$startDate:$,$endDate:M,startDateChanged:I,endDateChanged:X},P=a(4248),Z=a(3967),q=a.n(Z),L=a(7229),S=(0,d.memo)((function(e){var t=e.className,a=(0,c.eY)([l.xl.$activeStrategyId])[0],n=(0,c.eY)([O.strategyIdChanged,O.$value,O.$endDate,O.endDateChanged,O.$startDate,O.startDateChanged]),i=n[0],o=n[1],u=n[2],m=n[3],h=n[4],p=n[5],f=(0,P.M)("datetime");(0,d.useEffect)((function(){i(a)}),[a,i]);var j=q()("active-team-stats",t);return(0,r.jsx)(s.Xg.Cloud,{contentClassName:j,header:{title:"Статистика активных партнеров",subtitle:"Показана статистика за последний месяц",right:(0,r.jsxs)("div",{className:"active-team-stats__right-wrapper",children:[(0,r.jsxs)("div",{className:"right-wrapper",children:[(0,r.jsx)("p",{children:"Начало:"}),(0,r.jsx)(x.ot,{type:"date",name:"start-date",value:h,onChange:p})]}),(0,r.jsxs)("div",{className:"right-wrapper",children:[(0,r.jsx)("p",{children:"Конец:"}),(0,r.jsx)(x.ot,{type:"date",name:"end-date",value:u,onChange:m})]}),(0,r.jsx)(g.TW,{className:"sales-funnel__select"})]})},children:(0,r.jsx)(L.Z,{type:"area",series:[{data:null==o?void 0:o.map((function(e){return{x:e.date,y:e.count}}))}],options:f.options,height:260})})}));const T=function(){return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(u.Z,{className:"custom-row",children:[(0,r.jsx)(m.Z,{xs:12,children:(0,r.jsx)(n.tF,{})}),(0,r.jsx)(m.Z,{xs:12,children:(0,r.jsx)(f,{})}),(0,r.jsx)(m.Z,{xs:12,lg:6,children:(0,r.jsx)(S,{})})]})})}},722:(e,t,a)=>{a.d(t,{hy:()=>$,Ju:()=>I,JI:()=>d,tF:()=>p});var r=a(5893),n=a(7456),s=a(8545),l=a(4190),i=a(7294),o=a(1555),c=a(4051),d=function(){var e=(0,l.eY)([s.mr.$firstName,s.mr.$lastName,s.mr.$phone,s.mr.$birthday,s.mr.$city,s.mr.$email,s.mr.$password]),t=e[0],a=e[1],d=e[2],u=e[3],m=e[4],h=e[5],p=e[6],f=(0,l.eY)([s.mr.$error])[0],g=(0,l.eY)([s.mr.firstNameChanged,s.mr.lastNameChanged,s.mr.phoneChanged,s.mr.birthdayChanged,s.mr.cityChanged,s.mr.emailChanged,s.mr.passwordChanged]),x=g[0],j=g[1],v=g[2],b=g[3],N=g[4],_=g[5],y=g[6],D=(0,l.eY)([s.mr.reseted,s.mr.submited]),C=D[0],Y=D[1];(0,i.useEffect)((function(){}),[C]);var M=function(e){return(0,r.jsx)(o.Z,{xs:12,md:6,lg:4,children:e})};return(0,r.jsx)(n.Xg.Cloud,{className:"edit-profile",header:{title:"Редактировать профиль",subtitle:"Для сохранения данных требуется ввести пароль"},children:(0,r.jsx)(n.l0,{footer:(0,r.jsxs)(r.Fragment,{children:[f&&(0,r.jsx)("div",{className:"edit-profile__error",children:f}),(0,r.jsx)("div",{className:"edit-profile__buttons",children:(0,r.jsx)(n.x3,{onClick:Y,children:"Сохранить"})})]}),children:(0,r.jsxs)(c.Z,{className:"custom-row",children:[M((0,r.jsx)(n.l0.Input,{className:"edit-profile__input",label:"Имя",placeholder:"Имя",value:t,onChange:x})),M((0,r.jsx)(n.l0.Input,{className:"edit-profile__input",label:"Фамилия",placeholder:"Фамилия",value:a,onChange:j})),M((0,r.jsx)(n.l0.Input,{className:"edit-profile__input",type:"email",label:"Email",placeholder:"Email: mail@gmail.com",value:h,onChange:_})),M((0,r.jsx)(n.l0.Input,{className:"edit-profile__input",type:"password",name:"passwordForConfrimEdit",label:"Пароль",placeholder:"*******",value:p,onChange:y})),M((0,r.jsx)(n.l0.Input,{className:"edit-profile__input",type:"date",label:"Дата рождения",placeholder:"Дата рождения",value:u,onChange:b})),M((0,r.jsx)(n.l0.Input,{className:"edit-profile__input",type:"telephone",label:"Телефон",placeholder:"+7 (XXX) XXX XX XX",value:d,onChange:v})),M((0,r.jsx)(n.l0.Input,{className:"edit-profile__input",label:"Город",placeholder:"Москва",value:m,onChange:N}))]})})})},u=a(881),m=a(3967),h=a.n(m),p=(0,i.memo)((function(e){var t=e.className,a=h()("main-profile-widgets",t),i=(0,l.eY)([s.K_.$value,s.K_.$pending]),d=i[0],m=(i[1],function(e){return(0,r.jsx)(o.Z,{xs:12,md:6,lg:3,children:e})});return(0,r.jsx)("div",{className:a,children:(0,r.jsxs)(c.Z,{className:"custom-row",children:[m((0,r.jsx)(n.Xg.SmallWidget,{Icon:u.Vt,title:"Количество партнеров",value:"1 234"})),m((0,r.jsx)(n.Xg.SmallWidget,{Icon:u.uB,title:"Товарооборот",value:"143 876 $"})),m((0,r.jsx)(n.Xg.SmallWidget,{Icon:u.r6,title:"Заработано",value:"".concat(d,"$")})),m((0,r.jsx)(n.Xg.SmallWidget,{Icon:u.NR,title:"Квалификация",value:"Manager 4*"}))]})})})),f=a(9739);const g=a.p+"assets/avatar-bg-profile.jpg";var x=a(6163),j=a(8116),v=a(7255),b=(0,j.ub)({effect:x.N5.updateAvatar}),N=(0,j.MT)(null),_=(0,j.yM)();N.on(_,(function(e,t){return t}));var y=b.pending,D=(0,j.MT)(null),C=(0,j.yM)(),Y=(0,j.yM)();(0,j.UP)({clock:C,source:{avatar:N},filter:function(e){return!!e.avatar},fn:function(e){return{avatar:e.avatar}},target:b}),(0,j.UP)({clock:b.done,fn:function(){return"Аватар изменен"},target:s.iR.showSuccess}),(0,j.UP)({clock:b.done,target:s.jW.reload}),(0,j.UP)({clock:b.fail,fn:function(){return"Аватар не изменен"},target:s.iR.showDanger}),(0,v.m)({clock:Y,target:[N]}),(0,v.m)({clock:[],target:D});var M={$avatar:N,avatarChanged:_,$error:D,$pending:y,submited:C,reseted:Y},$=function(){var e=(0,l.eY)([M.avatarChanged])[0],t=(0,l.eY)([M.submited])[0],a=(0,l.eY)([s.mr.$firstName,s.mr.$lastName]),o=a[0],c=a[1],d=(0,i.useCallback)((function(a){var r=a.target;if(r.files&&r.files[0]){var n=r.files[0],s=new FormData;s.append("avatar",n),e(s),t()}}),[e,t]);return(0,r.jsxs)(n.Xg.Cloud,{className:"avatar-profile",children:[(0,r.jsx)("div",{className:"avatar-profile__bg-wrapper",children:(0,r.jsx)("img",{src:g,className:"avatar-profile__bg-image"})}),(0,r.jsxs)("div",{className:"avatar-profile__avatar-wrapper",children:[(0,r.jsxs)("div",{className:"avatar-profile__avatar",children:[(0,r.jsx)(n.qE,{size:87}),(0,r.jsx)(f.Z,{type:"file",accept:".png, .jpg",onChange:d})]}),(0,r.jsxs)("div",{className:"avatar-profile__title-wrapper",children:[(0,r.jsxs)("p",{className:"title",children:[o," ",c]}),(0,r.jsx)("p",{className:"text",children:"Квалификация: Manager"})]})]})]})};const w=a.p+"assets/banner-profile.webp";var I=function(){return(0,r.jsxs)("div",{className:"banner-profile",children:[(0,r.jsx)("div",{className:"banner-profile__bg-wrapper",children:(0,r.jsx)("img",{src:w,className:"banner-profile__bg-image"})}),(0,r.jsx)("div",{className:"banner-profile__text",children:(0,r.jsx)("div",{className:"banner-profile__title",children:"Пригласи инвестора в проект и получи 5% в токенах!"})})]})}}}]);
//# sourceMappingURL=833.2ffabcf7b1ef7ade08b7.js.map