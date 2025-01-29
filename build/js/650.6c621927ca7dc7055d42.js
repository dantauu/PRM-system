"use strict";(self.webpackChunkprm_all=self.webpackChunkprm_all||[]).push([[650],{6341:(t,e,n)=>{n.d(e,{cd:()=>c,sN:()=>u});var s=n(5893);const r=n.p+"assets/default-strategy-image.png";var a=n(3967),o=n.n(a),i=n(7294),u=function(t){var e=t.className,n=t.image,a=t.title,i=t.subtitle,u=t.likeButtonSlot,c=t.leftButtonSlot,l=t.rightButtonSlot,d=o()("strategy-item-layout",e);return(0,s.jsxs)("div",{className:d,children:[(0,s.jsx)("div",{className:"strategy-item-layout__like-button",children:u}),(0,s.jsx)("img",{src:n||r,className:"strategy-item-layout__image"}),(0,s.jsxs)("div",{className:"strategy-item-layout__text",children:[(0,s.jsx)("div",{className:"strategy-item-layout__title",children:a}),(0,s.jsx)("div",{className:"strategy-item-layout__subtitle",children:i})]}),(0,s.jsxs)("div",{className:"strategy-item-layout__buttons",children:[(0,s.jsx)("div",{className:"strategy-item-layout__left-button",children:c}),(0,s.jsx)("div",{className:"strategy-item-layout__right-button",children:l})]})]})},c=(0,i.memo)(u),l=n(6163),d=function(){return d=Object.assign||function(t){for(var e,n=1,s=arguments.length;n<s;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t},d.apply(this,arguments)};function m(t){var e=t.contact_id,n=t.custom_strategy_status_id;return d(d({},e),{status:n})}function _(t){var e=t.strategy,n=t.steps,s=t.statuses,r=t.contacts;return d(d({},e),{steps:n,statuses:s,contacts:r})}var p=n(8545),g=n(3047),h=n(8116),f=function(){return f=Object.assign||function(t){for(var e,n=1,s=arguments.length;n<s;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t},f.apply(this,arguments)},y=function(t,e,n,s){return new(n||(n=Promise))((function(r,a){function o(t){try{u(s.next(t))}catch(t){a(t)}}function i(t){try{u(s.throw(t))}catch(t){a(t)}}function u(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(o,i)}u((s=s.apply(t,e||[])).next())}))},x=function(t,e){var n,s,r,a,o={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return a={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function i(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a&&(a=0,i[0]&&(o=0)),o;)try{if(n=1,s&&(r=2&i[0]?s.return:i[0]?s.throw||((r=s.return)&&r.call(s),0):s.next)&&!(r=r.call(s,i[1])).done)return r;switch(s=0,r&&(i=[2&i[0],r.value]),i[0]){case 0:case 1:r=i;break;case 4:return o.label++,{value:i[1],done:!1};case 5:o.label++,s=i[1],i=[0];continue;case 7:i=o.ops.pop(),o.trys.pop();continue;default:if(!((r=(r=o.trys).length>0&&r[r.length-1])||6!==i[0]&&2!==i[0])){o=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&i[1]<r[3])){o.label=i[1];break}if(6===i[0]&&o.label<r[1]){o.label=r[1],r=i;break}if(r&&o.label<r[2]){o.label=r[2],o.ops.push(i);break}r[2]&&o.ops.pop(),o.trys.pop();continue}i=e.call(t,o)}catch(t){i=[6,t],s=0}finally{n=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}},v=(0,g.$d)({name:"DOMAIN_CUSTOM_STRATEGY",api:function(t){return y(void 0,void 0,void 0,(function(){return x(this,(function(e){return[2,Promise.all(t.map($))]}))}))}}),j=(0,g.t2)({name:"DOMAIN_CUSTOM_STRATEGY_CONTACT",api:l.cF.getAll}),b=(0,h.MT)(null),N=(0,h.$e)(v.$items,b,(function(t,e){return t.find((function(t){return t.custom_strategy_id===e}))||null})),C=(0,h.yM)(),k=(0,h.GW)((function(t){var e=t.strategies,n=t.strategy,s=e.findIndex((function(t){var e=t.custom_strategy_id;return n.custom_strategy_id===e}));if(-1===s)return e;var r=function(t,e,n){if(n||2===arguments.length)for(var s,r=0,a=e.length;r<a;r++)!s&&r in e||(s||(s=Array.prototype.slice.call(e,0,r)),s[r]=e[r]);return t.concat(s||Array.prototype.slice.call(e))}([],e,!0);return r.splice(s,1,n),r}));function $(t){return y(this,void 0,void 0,(function(){var e,n,s,r,a,o,i,u,c;return x(this,(function(l){switch(l.label){case 0:return[4,T(t)];case 1:return e=l.sent(),n=e[0],s=e[1],r=e[2],a=e[3],o=r.map((function(t){return function(t){return d({},t.status)}({status:t})})),i=s.map((function(t){return function(t){var e=t.status;return d(d({},t.result),{status:e})}({result:t,status:o.find((function(e){return e.custom_strategy_status_id===t.custom_strategy_status_id}))})})),u=n.map((function(t){return function(t){var e=t.results;return d(d({},t.step),{results:e})}({step:t,results:i.filter((function(e){return e.custom_strategy_step_id===t.custom_strategy_step_id}))})})),c=a.items.map(m),[2,_({strategy:t,steps:u,statuses:o,contacts:c})]}}))}))}function T(t){return y(this,void 0,void 0,(function(){return x(this,(function(e){return[2,Promise.all([l.Ax.getAll(t.custom_strategy_id),l.UL.getAll(t.custom_strategy_id),l.VO.getAll(t.custom_strategy_id),l.cF.getAll({strategy_id:t.custom_strategy_id})])]}))}))}b.on(C,(function(t,e){return e})),(0,h.UP)({clock:[p.nO.getAll.done],source:p.nO.getAll.$items,target:v.submited}),(0,h.UP)({clock:v.done,filter:function(t){return!!t.length},fn:function(t){return t[0].custom_strategy_id},target:C}),(0,h.UP)({clock:j.done,source:{strategies:v.$items,strategy:N},fn:function(t,e){var n=t.strategies,s=t.strategy;return{strategies:n,strategy:f(f({},s),{contacts:e.items.map(m)})}},target:k}),(0,h.UP)({clock:k.doneData,target:v.$items}),f(f({},v),{getContacts:j,$activeItemId:b,$activeItem:N,activeChanged:C})},1018:(t,e,n)=>{n.d(e,{Qy:()=>Ft,Jf:()=>Bt,V9:()=>c});var s=n(5893),r=n(6341),a=n(1806),o=n(3967),i=n.n(o),u=n(7294),c=function(t){var e=t.className,n=t.strategy,o=i()("strategy-item",e);return(0,s.jsx)(r.sN,{className:o,likeButtonSlot:(0,s.jsx)(a.ox,{}),title:n.name,subtitle:"Базовая стратегия",rightButtonSlot:(0,s.jsx)(a.Ik,{strategy:n})})},l=((0,u.memo)(c),40),d=200,m=100,_=200,p=200,g=100,h={status:d,step:_,"step-result":p},f={status:m,step:100,"step-result":g},y=n(6163),x=n(8545),v=n(3047),j=n(8116),b=n(1247),N=function(){return N=Object.assign||function(t){for(var e,n=1,s=arguments.length;n<s;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t},N.apply(this,arguments)},C=(0,v.t2)({name:"UPDATE_CUSTOM_STRATEGY_STATUS",api:y.VO.update}),k=(0,j.MT)(!1),$=(0,j.MT)(null),T=(0,j.$e)(x.xl.$statuses,$,(function(t,e){return t.find((function(t){return t.custom_strategy_status_id===e}))})),M=(0,j.MT)(""),w=(0,j.MT)(""),S=(0,j.MT)(null),P=(0,j.$e)(M,w,S,(function(t,e,n){return!!t&&!!e&&!!n})),Z=(0,j.yM)(),A=(0,j.yM)(),U=(0,j.yM)(),O=(0,j.yM)(),Y=(0,j.yM)(),E=(0,j.yM)();k.on(Z,(function(){return!0})),k.on(A,(function(){return!1})),k.on(C.done,(function(){return!1})),$.on(Z,(function(t,e){return e})),M.on(U,(function(t,e){return e})),w.on(O,(function(t,e){return e})),S.on(Y,(function(t,e){return e})),(0,j.UP)({clock:T.updates,filter:function(t){return Boolean(t)},target:(0,b.h)({targets:{name:U,description:O,global_strategy_status_color_id:Y}})}),(0,j.UP)({clock:E,source:{status:T,name:M,description:w,color:S},filter:P,fn:function(t){var e=t.status,n=t.name,s=t.description,r=t.color;return{custom_strategy_status_id:e.custom_strategy_status_id,name:n,description:s,global_strategy_status_color_id:r,activity_flag:e.activity_flag,custom_strategy_next_step_id:e.custom_strategy_next_step_id}},target:C.submited}),(0,j.UP)({clock:C.done,fn:function(t){return t.custom_strategy_id},target:x.xl.requestes.statuses.submited}),(0,j.UP)({clock:C.done,fn:function(){return"Изменения сохранены"},target:x.iR.showSuccess});var I=N(N({},C),{$show:k,$name:M,$description:w,$color:S,$canSubmit:P,opened:Z,closed:A,nameChanged:U,descriptionChanged:O,colorChanged:Y,submited:E}),R=n(7456),B=n(4190),D=n(3930),F=n(4051),H=n(1555),G=(0,u.memo)((function(t){var e=t.className,n=(0,B.eY)([I.$show,I.closed]),r=n[0],a=n[1],o=(0,B.eY)([I.$name,I.$description,I.$color]),u=o[0],c=o[1],l=o[2],d=(0,B.eY)([I.nameChanged,I.descriptionChanged,I.colorChanged]),m=d[0],_=d[1],p=d[2],g=(0,B.eY)([I.submited,I.$canSubmit]),h=g[0],f=g[1],y=(0,B.eY)([x.NM.getAll.$items,x.NM.getAll.$status]),v=y[0],j=y[1],b=i()("edit-status-modal",e);return(0,s.jsxs)(D.Z,{className:b,show:r,onHide:a,centered:!0,children:[(0,s.jsx)(D.Z.Header,{children:(0,s.jsx)(D.Z.Title,{children:"Редактирование статуса"})}),(0,s.jsx)(D.Z.Body,{children:(0,s.jsx)(R.l0,{onSubmit:h,children:(0,s.jsxs)(F.Z,{className:"custom-row",children:[(0,s.jsx)(H.Z,{xs:12,children:(0,s.jsx)(R.l0.Input,{label:"Название",value:u,onChange:m})}),(0,s.jsx)(H.Z,{xs:12,children:(0,s.jsx)(R.l0.Input,{type:"textarea",label:"Описание",value:c,onChange:_})}),(0,s.jsx)(H.Z,{xs:12,children:(0,s.jsx)(R.l0.SimpleColorPicker,{colors:v.map((function(t){var e=t.color_HEX;return{value:t.global_strategy_status_color_id,color:e}})),pending:"pending"==j,value:l,onChange:p})})]})})}),(0,s.jsxs)(D.Z.Footer,{children:[(0,s.jsx)(R.x3,{disabled:!f,onClick:h,children:"Сохранить"}),(0,s.jsx)(R.x3,{variant:"secondary",onClick:a,children:"Закрыть"})]})]})})),J=function(t){var e=t.className,n=t.width,r=t.height,a=t.title,o=t.children,c=t.inputPort,l=t.outputPort,d=t.onClick,m=i()("base-node",e),_=(0,u.useMemo)((function(){return{width:n,height:r}}),[r,n]);return(0,s.jsxs)("div",{className:m,style:_,onClick:d,children:[(0,s.jsx)("div",{className:"base-node__header",children:a}),o,(0,s.jsxs)("div",{className:"base-node__ports",children:[c&&(0,s.jsx)("div",{className:"base-node__input",children:(0,u.cloneElement)(c)}),l&&(0,s.jsx)("div",{className:"base-node__output",children:(0,u.cloneElement)(l)})]})]})},W=(0,u.memo)(J),q=n(549),L=function(t){var e=t.className,n=t.data,r=t.inputs,a=t.outputs,o=(0,B.eY)([x.NM.getAll.$dictionaryById,x.NM.getAll.$status]),c=o[0],l=o[1],_=(0,B.eY)(I.opened),p=i()("status-node",e),g=n,h=(0,u.useCallback)((function(){n&&_(n.custom_strategy_status_id)}),[n,_]);if(!n)return null;var f=g.global_strategy_status_color_id in c?c[g.global_strategy_status_color_id]:void 0;return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(W,{className:p,width:d,height:m,title:"Статус",inputPort:r.length?r[0]:void 0,outputPort:a.length?a[0]:void 0,onClick:h,children:(0,s.jsxs)("div",{className:"status-node__info",children:["pending"===l?(0,s.jsx)(q.Z,{containerClassName:"status-node__color"}):(0,s.jsx)("div",{className:"status-node__color",style:{backgroundColor:f||void 0}}),(0,s.jsx)("div",{className:"status-node__name",children:g.name})]})}),(0,s.jsx)(G,{})]})},V=((0,u.memo)(L),function(){return V=Object.assign||function(t){for(var e,n=1,s=arguments.length;n<s;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t},V.apply(this,arguments)}),z=(0,v.t2)({name:"UPDATE_CUSTOM_STRATEGY_STEP",api:y.Ax.update}),X=(0,j.MT)(!1),Q=(0,j.MT)(null),K=(0,j.$e)(x.xl.$steps,Q,(function(t,e){return t.find((function(t){return t.custom_strategy_step_id===e}))})),tt=(0,j.MT)(""),et=(0,j.MT)(""),nt=(0,j.$e)(tt,et,(function(t,e){return!!t&&!!e})),st=(0,j.yM)(),rt=(0,j.yM)(),at=(0,j.yM)(),ot=(0,j.yM)(),it=(0,j.yM)();X.on(st,(function(){return!0})),X.on(rt,(function(){return!1})),X.on(z.done,(function(){return!1})),Q.on(st,(function(t,e){return e})),tt.on(at,(function(t,e){return e})),et.on(ot,(function(t,e){return e})),(0,j.UP)({clock:K.updates,filter:function(t){return Boolean(t)},target:(0,b.h)({targets:{name:at,description:ot}})}),(0,j.UP)({clock:it,source:{step:K,name:tt,description:et},filter:nt,fn:function(t){var e=t.step,n=t.name,s=t.description;return{custom_strategy_step_id:e.custom_strategy_step_id,name:n,description:s,comment:e.comment}},target:z.submited}),(0,j.UP)({clock:z.done,fn:function(t){return t.custom_strategy_id},target:x.xl.requestes.steps.submited}),(0,j.UP)({clock:z.done,fn:function(){return"Изменения сохранены"},target:x.iR.showSuccess});var ut=V(V({},z),{$show:X,$name:tt,$description:et,$canSubmit:nt,opened:st,closed:rt,nameChanged:at,descriptionChanged:ot,submited:it}),ct=(0,u.memo)((function(t){var e=t.className,n=(0,B.eY)([ut.$show,ut.closed]),r=n[0],a=n[1],o=(0,B.eY)([ut.$name,ut.$description]),u=o[0],c=o[1],l=(0,B.eY)([ut.nameChanged,ut.descriptionChanged]),d=l[0],m=l[1],_=(0,B.eY)([ut.submited,ut.$canSubmit]),p=_[0],g=_[1],h=i()("edit-status-modal",e);return(0,s.jsxs)(D.Z,{className:h,show:r,onHide:a,centered:!0,children:[(0,s.jsx)(D.Z.Header,{children:(0,s.jsx)(D.Z.Title,{children:"Редактирование шага"})}),(0,s.jsx)(D.Z.Body,{children:(0,s.jsx)(R.l0,{onSubmit:p,children:(0,s.jsxs)(F.Z,{className:"custom-row",children:[(0,s.jsx)(H.Z,{xs:12,children:(0,s.jsx)(R.l0.Input,{label:"Название",value:u,onChange:d})}),(0,s.jsx)(H.Z,{xs:12,children:(0,s.jsx)(R.l0.Input,{type:"textarea",label:"Описание",value:c,onChange:m})})]})})}),(0,s.jsxs)(D.Z.Footer,{children:[(0,s.jsx)(R.x3,{disabled:!g,onClick:p,children:"Сохранить"}),(0,s.jsx)(R.x3,{variant:"secondary",onClick:a,children:"Закрыть"})]})]})})),lt=function(t){var e=t.className,n=t.data,r=t.inputs,a=t.outputs,o=(0,B.eY)(ut.opened),c=i()("step-node",e),l=n,d=(0,u.useCallback)((function(){n&&o(n.custom_strategy_step_id)}),[n,o]);return n?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(W,{className:c,width:_,height:100,title:"Шаг",inputPort:r.length?r[0]:void 0,outputPort:a.length?a[0]:void 0,onClick:d,children:(0,s.jsx)("div",{className:"step-node__info",children:(0,s.jsx)("div",{className:"step-node__name",children:l.name})})}),(0,s.jsx)(ct,{})]}):null},dt=((0,u.memo)(lt),function(){return dt=Object.assign||function(t){for(var e,n=1,s=arguments.length;n<s;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t},dt.apply(this,arguments)}),mt=(0,v.t2)({name:"UPDATE_CUSTOM_STRATEGY_STEP_RESULT",api:y.UL.update}),_t=(0,j.MT)(!1),pt=(0,j.MT)(null),gt=(0,j.$e)(x.xl.$stepResults,pt,(function(t,e){return t.find((function(t){return t.custom_strategy_step_result_id===e}))})),ht=(0,j.MT)(""),ft=(0,j.MT)(""),yt=(0,j.$e)(ht,ft,(function(t,e){return!!t&&!!e})),xt=(0,j.yM)(),vt=(0,j.yM)(),jt=(0,j.yM)(),bt=(0,j.yM)(),Nt=(0,j.yM)();_t.on(xt,(function(){return!0})),_t.on(vt,(function(){return!1})),_t.on(mt.done,(function(){return!1})),pt.on(xt,(function(t,e){return e})),ht.on(jt,(function(t,e){return e})),ft.on(bt,(function(t,e){return e})),(0,j.UP)({clock:gt.updates,filter:function(t){return Boolean(t)},target:(0,b.h)({targets:{result_name:jt,result_description:bt}})}),(0,j.UP)({clock:Nt,source:{stepResult:gt,name:ht,description:ft},filter:yt,fn:function(t){var e=t.stepResult,n=t.name,s=t.description;return{custom_strategy_step_id:e.custom_strategy_step_id,custom_strategy_status_id:e.custom_strategy_status_id,custom_strategy_step_result_id:e.custom_strategy_step_result_id,result_name:n,result_description:s}},target:mt.submited}),(0,j.UP)({clock:mt.done,source:x.xl.$strategy,fn:function(t){return t.custom_strategy_id},target:x.xl.requestes.stepResults.submited}),(0,j.UP)({clock:mt.done,fn:function(){return"Изменения сохранены"},target:x.iR.showSuccess});var Ct=dt(dt({},mt),{$show:_t,$name:ht,$description:ft,$canSubmit:yt,opened:xt,closed:vt,nameChanged:jt,descriptionChanged:bt,submited:Nt}),kt=(0,u.memo)((function(t){var e=t.className,n=(0,B.eY)([Ct.$show,Ct.closed]),r=n[0],a=n[1],o=(0,B.eY)([Ct.$name,Ct.$description]),u=o[0],c=o[1],l=(0,B.eY)([Ct.nameChanged,Ct.descriptionChanged]),d=l[0],m=l[1],_=(0,B.eY)([Ct.submited,Ct.$canSubmit]),p=_[0],g=_[1],h=i()("edit-step-result-modal",e);return(0,s.jsxs)(D.Z,{className:h,show:r,onHide:a,centered:!0,children:[(0,s.jsx)(D.Z.Header,{children:(0,s.jsx)(D.Z.Title,{children:"Редактирование результата"})}),(0,s.jsx)(D.Z.Body,{children:(0,s.jsx)(R.l0,{onSubmit:p,children:(0,s.jsxs)(F.Z,{className:"custom-row",children:[(0,s.jsx)(H.Z,{xs:12,children:(0,s.jsx)(R.l0.Input,{label:"Название",value:u,onChange:d})}),(0,s.jsx)(H.Z,{xs:12,children:(0,s.jsx)(R.l0.Input,{type:"textarea",label:"Описание",value:c,onChange:m})})]})})}),(0,s.jsxs)(D.Z.Footer,{children:[(0,s.jsx)(R.x3,{disabled:!g,onClick:p,children:"Сохранить"}),(0,s.jsx)(R.x3,{variant:"secondary",onClick:a,children:"Закрыть"})]})]})})),$t=function(t){var e=t.className,n=t.data,r=t.inputs,a=t.outputs,o=(0,B.eY)(Ct.opened),c=i()("step-result-node",e),l=n,d=(0,u.useCallback)((function(){n&&o(n.custom_strategy_step_result_id)}),[n,o]);return n?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(W,{className:c,width:p,height:g,title:"Результат",inputPort:r.length?r[0]:void 0,outputPort:a.length?a[0]:void 0,onClick:d,children:(0,s.jsx)("div",{className:"step-result-node__info",children:(0,s.jsx)("div",{className:"step-result-node__name",children:l.result_name})})}),(0,s.jsx)(kt,{})]}):null},Tt=((0,u.memo)($t),function(t,e,n){if(n||2===arguments.length)for(var s,r=0,a=e.length;r<a;r++)!s&&r in e||(s||(s=Array.prototype.slice.call(e,0,r)),s[r]=e[r]);return t.concat(s||Array.prototype.slice.call(e))});function Mt(t,e,n,s,r){void 0===s&&(s=!1),void 0===r&&(r=!1);var a="status-".concat(t.custom_strategy_status_id);return{id:a,disableDrag:!0,data:t,coordinates:e,render:n,inputs:s?[{id:"input-".concat(a),alignment:"left"}]:void 0,outputs:r?[{id:"output-".concat(a),alignment:"right"}]:void 0,linksTreeType:"status"}}function wt(t,e,n,s,r){void 0===s&&(s=!1),void 0===r&&(r=!1);var a="step-".concat(t.custom_strategy_step_id);return{id:a,disableDrag:!0,data:t,coordinates:e,render:n,inputs:s?[{id:"input-".concat(a),alignment:"left"}]:void 0,outputs:r?[{id:"output-".concat(a),alignment:"right"}]:void 0,linksTreeType:"step"}}function St(t,e,n,s,r){void 0===s&&(s=!1),void 0===r&&(r=!1);var a="step-result-".concat(t.custom_strategy_step_result_id);return{id:a,disableDrag:!0,data:t,coordinates:e,render:n,inputs:s?[{id:"input-".concat(a),alignment:"left"}]:void 0,outputs:r?[{id:"output-".concat(a),alignment:"right"}]:void 0,linksTreeType:"step-result"}}function Pt(t,e,n,s,r,a,o,i,u){void 0===u&&(u=!1);var c=r[0],m=r[1],_=t.custom_strategy_next_step_id?[Zt(e.find((function(e){return e.custom_strategy_step_id===t.custom_strategy_next_step_id})),e,n,s,[c+l+d,m],a,o,i,!0)]:[];return{name:"status-".concat(t.custom_strategy_status_id),type:"status",node:Mt(t,r,a,u,Boolean(_.length)),children:_,coordinates:r}}function Zt(t,e,n,s,r,a,o,i,u){void 0===u&&(u=!1);var c=r[0],d=r[1],m=n.filter((function(e){return e.custom_strategy_step_id===t.custom_strategy_step_id})).map((function(t,r){return function(t,e,n,s,r,a,o,i,u){void 0===u&&(u=!1);var c=r[0],d=r[1];return{name:"step-result-".concat(t.custom_strategy_step_result_id),type:"step-result",node:St(t,r,i,u,!0),children:[Pt(s.find((function(e){return e.custom_strategy_status_id===t.custom_strategy_status_id})),e,n,s,[c+l+p,d],a,o,i,!0)],coordinates:r}}(t,e,n,s,[c+l+_,d+r*(l+g)],a,o,i,!0)}));return{name:"step-".concat(t.custom_strategy_step_id),type:"step",node:wt(t,r,o,u,Boolean(m.length)),children:m,coordinates:r}}function At(t){return Tt([t.node],t.children.flatMap((function(t){return At(t)})),!0)}function Ut(t){var e=t.children.map((function(e){return{input:"output-".concat(t.name),output:"input-".concat(e.name)}}));return Tt(Tt([],e,!0),t.children.flatMap((function(t){return Ut(t)})),!0)}var Ot=n(8144),Yt=function(){var t=(0,B.eY)([x.xl.$steps,x.xl.$stepResults,x.xl.$statuses]),e=t[0],n=t[1],s=t[2];console.log("statuses statuses statuses",s);var r=(0,B.eY)([x.xl.$stepsStatus,x.xl.$stepResultsStatus,x.xl.$statusesStatus]).some((function(t){return"pending"===t})),a=(0,u.useMemo)((function(){return r?null:function(t,e,n,s,r,a,o){return Pt(t,e,n,s,[l,l],r,a,o)}(s[0],e,n,s,L,lt,$t)}),[r,s,n,e]),o=(0,u.useMemo)((function(){return a?At(a):[]}),[a]),i=(0,u.useMemo)((function(){return a?Ut(a):[]}),[a]),c=(0,u.useMemo)((function(){var t=0,e=0;return o.forEach((function(n){t=Math.max(t,n.coordinates[0]+l+h[n.linksTreeType]),e=Math.max(e,n.coordinates[1]+l+f[n.linksTreeType])})),[t,e]}),[o]),d=c[0],m=c[1],_=(0,u.useMemo)((function(){return r?(0,Ot.Ew)({nodes:[],links:[]}):(0,Ot.Ew)({nodes:o,links:i})}),[i,o,r]),p=(0,Ot.I_)(_),g=p[0],y=p[1].onChange;return(0,u.useEffect)((function(){y(_)}),[_,y]),{schema:g,pending:r,maxWidth:d,linksCount:i.length,maxHeight:m}},Et=(0,Ot.Ew)({nodes:[{id:"node-1",content:"Node 1",disableDrag:!0,render:function(){return(0,s.jsx)(J,{title:(0,s.jsx)(q.Z,{}),width:d,height:m,children:(0,s.jsx)(q.Z,{containerClassName:"skeleton-node__info",className:"skeleton-node__name",width:80})})},coordinates:[l,l]},{id:"node-2",content:"Node 2",disableDrag:!0,render:function(){return(0,s.jsx)(J,{title:(0,s.jsx)(q.Z,{}),width:_,height:100,children:(0,s.jsx)(q.Z,{containerClassName:"skeleton-node__info",className:"skeleton-node__name",width:120})})},coordinates:[2*l+d,l]},{id:"node-3",content:"Node 3",disableDrag:!0,render:function(){return(0,s.jsx)(J,{title:(0,s.jsx)(q.Z,{}),width:p,height:g,children:(0,s.jsx)(q.Z,{containerClassName:"skeleton-node__info",className:"skeleton-node__name",width:110})})},coordinates:[3*l+d+_,l]}]}),It={"--diagram-height":"".concat(2*l+m,"px")},Rt=(0,u.memo)((function(t){var e=t.className,n=(0,Ot.I_)(Et)[0],r=i()("strategy-diagram","strategy-diagram--skeleton",e);return(0,s.jsx)("div",{className:r,style:It,children:(0,s.jsx)(Ot.S0,{schema:n})})})),Bt=(0,u.memo)((function(t){var e=t.className,n=Yt(),r=n.schema,a=n.linksCount,o=n.pending,c=n.maxWidth,l=n.maxHeight,d=i()("strategy-diagram",e),m=(0,u.useMemo)((function(){return{"--diagram-width":"".concat(c,"px"),"--diagram-height":"".concat(l,"px")}}),[l,c]);return o?(0,s.jsx)(Rt,{className:d}):(0,s.jsx)("div",{className:d,style:m,children:(0,s.jsx)(Ot.S0,{schema:r},a)})})),Dt=n(7878),Ft=(0,u.memo)((function(t){var e=t.className,n=(0,B.eY)([Dt.J.$name,Dt.J.$description]),r=n[0],o=n[1],u=(0,B.eY)([Dt.J.nameChanged,Dt.J.descriptionChanged]),c=u[0],l=u[1],d=(0,B.eY)([Dt.J.submited,Dt.J.$canSubmit]),m=d[0],_=d[1],p=i()("edit-strategy-form",e);return(0,s.jsx)(R.Xg.Cloud,{header:{title:"Стратегия",subtitle:"Редактирование выбранной стратегии"},className:p,children:(0,s.jsx)(R.l0,{footerClassName:"edit-strategy-form__footer",footer:(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(R.x3,{disabled:!_,onClick:m,children:"Сохранить"}),(0,s.jsx)(a.vD,{})]}),onSubmit:m,children:(0,s.jsxs)(F.Z,{className:"custom-row",children:[(0,s.jsx)(H.Z,{xs:12,children:(0,s.jsx)(a.TW,{})}),(0,s.jsx)(H.Z,{xs:12,children:(0,s.jsx)(R.l0.Input,{size:"sm",label:"Название стратегии",value:r,onChange:c})}),(0,s.jsx)(H.Z,{xs:12,children:(0,s.jsx)(R.l0.Input,{type:"textarea",size:"sm",label:"Описание",value:o,onChange:l})})]})})})}))}}]);
//# sourceMappingURL=650.6c621927ca7dc7055d42.js.map