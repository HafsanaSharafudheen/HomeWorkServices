import{r as s,u as X,j as o,y as k,a as ht,b as Je,f as mt,c as pt,d as O,t as gt,m as He,A as Ue,T as vt,e as xt,g as ve,o as Ae,s as ge,h as Ce,i as Et,l as Ye,k as yt,R as Rt,C as Ct,n as jt,p as Ke,F as Qe,q as Tt,v as bt,w as Nt,B as wt,x as Mt}from"./index-Dug1QaT8.js";function St(){return s.useState(null)}function Ze(){const e=s.useRef(!0),t=s.useRef(()=>e.current);return s.useEffect(()=>(e.current=!0,()=>{e.current=!1}),[]),t.current}function kt(e){const t=s.useRef(null);return s.useEffect(()=>{t.current=e}),t.current}const Ot=typeof global<"u"&&global.navigator&&global.navigator.product==="ReactNative",It=typeof document<"u",Pe=It||Ot?s.useLayoutEffect:s.useEffect;function Dt(e,t){const n=s.useRef(!0);s.useEffect(()=>{if(n.current){n.current=!1;return}return e()},t)}function At(e){const t=s.useRef(e);return t.current=e,t}function Le(e){const t=At(e);s.useEffect(()=>()=>t.current(),[])}const De=2**31-1;function et(e,t,n){const r=n-Date.now();e.current=r<=De?setTimeout(t,r):setTimeout(()=>et(e,t,n),De)}function Lt(){const e=Ze(),t=s.useRef();return Le(()=>clearTimeout(t.current)),s.useMemo(()=>{const n=()=>clearTimeout(t.current);function r(a,i=0){e()&&(n(),i<=De?t.current=setTimeout(a,i):et(t,a,Date.now()+i))}return{set:r,clear:n,handleRef:t}},[])}const tt=s.forwardRef(({className:e,bsPrefix:t,as:n="div",...r},a)=>(t=X(t,"carousel-caption"),o.jsx(n,{ref:a,className:k(e,t),...r})));tt.displayName="CarouselCaption";const nt=s.forwardRef(({as:e="div",bsPrefix:t,className:n,...r},a)=>{const i=k(n,X(t,"carousel-item"));return o.jsx(e,{ref:a,...r,className:i})});nt.displayName="CarouselItem";const $t=40;function Bt(e){if(!e||!e.style||!e.parentNode||!e.parentNode.style)return!1;const t=getComputedStyle(e);return t.display!=="none"&&t.visibility!=="hidden"&&getComputedStyle(e.parentNode).display!=="none"}const st=s.forwardRef(({defaultActiveIndex:e=0,...t},n)=>{const{as:r="div",bsPrefix:a,slide:i=!0,fade:x=!1,controls:v=!0,indicators:E=!0,indicatorLabels:h=[],activeIndex:m,onSelect:y,onSlide:c,onSlid:f,interval:j=5e3,keyboard:F=!0,onKeyDown:W,pause:b="hover",onMouseOver:_,onMouseOut:D,wrap:S=!0,touch:A=!0,onTouchStart:Z,onTouchMove:V,onTouchEnd:H,prevIcon:he=o.jsx("span",{"aria-hidden":"true",className:"carousel-control-prev-icon"}),prevLabel:G="Previous",nextIcon:ae=o.jsx("span",{"aria-hidden":"true",className:"carousel-control-next-icon"}),nextLabel:ee="Next",variant:te,className:ie,children:ne,...L}=ht({defaultActiveIndex:e,...t},{activeIndex:"onSelect"}),T=X(a,"carousel"),g=Je(),$=s.useRef(null),[se,B]=s.useState("next"),[z,N]=s.useState(!1),[w,q]=s.useState(!1),[R,le]=s.useState(m||0);s.useEffect(()=>{!w&&m!==R&&($.current?B($.current):B((m||0)>R?"next":"prev"),i&&q(!0),le(m||0))},[m,w,R,i]),s.useEffect(()=>{$.current&&($.current=null)});let I=0,J;mt(ne,(l,p)=>{++I,p===m&&(J=l.props.interval)});const U=pt(J),M=s.useCallback(l=>{if(w)return;let p=R-1;if(p<0){if(!S)return;p=I-1}$.current="prev",y==null||y(p,l)},[w,R,y,S,I]),C=O(l=>{if(w)return;let p=R+1;if(p>=I){if(!S)return;p=0}$.current="next",y==null||y(p,l)}),Y=s.useRef();s.useImperativeHandle(n,()=>({element:Y.current,prev:M,next:C}));const K=O(()=>{!document.hidden&&Bt(Y.current)&&(g?M():C())}),u=se==="next"?"start":"end";Dt(()=>{i||(c==null||c(R,u),f==null||f(R,u))},[R]);const ce=`${T}-item-${se}`,re=`${T}-item-${u}`,je=s.useCallback(l=>{gt(l),c==null||c(R,u)},[c,R,u]),Te=s.useCallback(()=>{q(!1),f==null||f(R,u)},[f,R,u]),be=s.useCallback(l=>{if(F&&!/input|textarea/i.test(l.target.tagName))switch(l.key){case"ArrowLeft":l.preventDefault(),g?C(l):M(l);return;case"ArrowRight":l.preventDefault(),g?M(l):C(l);return}W==null||W(l)},[F,W,M,C,g]),Ne=s.useCallback(l=>{b==="hover"&&N(!0),_==null||_(l)},[b,_]),we=s.useCallback(l=>{N(!1),D==null||D(l)},[D]),xe=s.useRef(0),oe=s.useRef(0),Ee=Lt(),d=s.useCallback(l=>{xe.current=l.touches[0].clientX,oe.current=0,b==="hover"&&N(!0),Z==null||Z(l)},[b,Z]),Q=s.useCallback(l=>{l.touches&&l.touches.length>1?oe.current=0:oe.current=l.touches[0].clientX-xe.current,V==null||V(l)},[V]),ye=s.useCallback(l=>{if(A){const p=oe.current;Math.abs(p)>$t&&(p>0?M(l):C(l))}b==="hover"&&Ee.set(()=>{N(!1)},j||void 0),H==null||H(l)},[A,b,M,C,Ee,j,H]),We=j!=null&&!z&&!w,Me=s.useRef();s.useEffect(()=>{var l,p;if(!We)return;const P=g?M:C;return Me.current=window.setInterval(document.visibilityState?K:P,(l=(p=U.current)!=null?p:j)!=null?l:void 0),()=>{Me.current!==null&&clearInterval(Me.current)}},[We,M,C,U,j,K,g]);const _e=s.useMemo(()=>E&&Array.from({length:I},(l,p)=>P=>{y==null||y(p,P)}),[E,I,y]);return o.jsxs(r,{ref:Y,...L,onKeyDown:be,onMouseOver:Ne,onMouseOut:we,onTouchStart:d,onTouchMove:Q,onTouchEnd:ye,className:k(ie,T,i&&"slide",x&&`${T}-fade`,te&&`${T}-${te}`),children:[E&&o.jsx("div",{className:`${T}-indicators`,children:He(ne,(l,p)=>o.jsx("button",{type:"button","data-bs-target":"","aria-label":h!=null&&h.length?h[p]:`Slide ${p+1}`,className:p===R?"active":void 0,onClick:_e?_e[p]:void 0,"aria-current":p===R},p))}),o.jsx("div",{className:`${T}-inner`,children:He(ne,(l,p)=>{const P=p===R;return i?o.jsx(vt,{in:P,onEnter:P?je:void 0,onEntered:P?Te:void 0,addEndListener:xt,children:(me,ft)=>s.cloneElement(l,{...ft,className:k(l.props.className,P&&me!=="entered"&&ce,(me==="entered"||me==="exiting")&&"active",(me==="entering"||me==="exiting")&&re)})}):s.cloneElement(l,{className:k(l.props.className,P&&"active")})})}),v&&o.jsxs(o.Fragment,{children:[(S||m!==0)&&o.jsxs(Ue,{className:`${T}-control-prev`,onClick:M,children:[he,G&&o.jsx("span",{className:"visually-hidden",children:G})]}),(S||m!==I-1)&&o.jsxs(Ue,{className:`${T}-control-next`,onClick:C,children:[ae,ee&&o.jsx("span",{className:"visually-hidden",children:ee})]})]})]})});st.displayName="Carousel";const ue=Object.assign(st,{Caption:tt,Item:nt});var Ft=Function.prototype.bind.call(Function.prototype.call,[].slice);function de(e,t){return Ft(e.querySelectorAll(t))}function Xe(e,t){if(e.contains)return e.contains(t);if(e.compareDocumentPosition)return e===t||!!(e.compareDocumentPosition(t)&16)}const Wt="data-rr-ui-";function _t(e){return`${Wt}${e}`}const rt=s.createContext(ve?window:void 0);rt.Provider;function $e(){return s.useContext(rt)}var Re;function Ve(e){if((!Re&&Re!==0||e)&&ve){var t=document.createElement("div");t.style.position="absolute",t.style.top="-9999px",t.style.width="50px",t.style.height="50px",t.style.overflow="scroll",document.body.appendChild(t),Re=t.offsetWidth-t.clientWidth,document.body.removeChild(t)}return Re}function Se(e){e===void 0&&(e=Ae());try{var t=e.activeElement;return!t||!t.nodeName?null:t}catch{return e.body}}function Ht(e=document){const t=e.defaultView;return Math.abs(t.innerWidth-e.documentElement.clientWidth)}const Ge=_t("modal-open");class Be{constructor({ownerDocument:t,handleContainerOverflow:n=!0,isRTL:r=!1}={}){this.handleContainerOverflow=n,this.isRTL=r,this.modals=[],this.ownerDocument=t}getScrollbarWidth(){return Ht(this.ownerDocument)}getElement(){return(this.ownerDocument||document).body}setModalAttributes(t){}removeModalAttributes(t){}setContainerStyle(t){const n={overflow:"hidden"},r=this.isRTL?"paddingLeft":"paddingRight",a=this.getElement();t.style={overflow:a.style.overflow,[r]:a.style[r]},t.scrollBarWidth&&(n[r]=`${parseInt(ge(a,r)||"0",10)+t.scrollBarWidth}px`),a.setAttribute(Ge,""),ge(a,n)}reset(){[...this.modals].forEach(t=>this.remove(t))}removeContainerStyle(t){const n=this.getElement();n.removeAttribute(Ge),Object.assign(n.style,t.style)}add(t){let n=this.modals.indexOf(t);return n!==-1||(n=this.modals.length,this.modals.push(t),this.setModalAttributes(t),n!==0)||(this.state={scrollBarWidth:this.getScrollbarWidth(),style:{}},this.handleContainerOverflow&&this.setContainerStyle(this.state)),n}remove(t){const n=this.modals.indexOf(t);n!==-1&&(this.modals.splice(n,1),!this.modals.length&&this.handleContainerOverflow&&this.removeContainerStyle(this.state),this.removeModalAttributes(t))}isTopModal(t){return!!this.modals.length&&this.modals[this.modals.length-1]===t}}const ke=(e,t)=>ve?e==null?(t||Ae()).body:(typeof e=="function"&&(e=e()),e&&"current"in e&&(e=e.current),e&&("nodeType"in e||e.getBoundingClientRect)?e:null):null;function Ut(e,t){const n=$e(),[r,a]=s.useState(()=>ke(e,n==null?void 0:n.document));if(!r){const i=ke(e);i&&a(i)}return s.useEffect(()=>{},[t,r]),s.useEffect(()=>{const i=ke(e);i!==r&&a(i)},[e,r]),r}function Yt({children:e,in:t,onExited:n,mountOnEnter:r,unmountOnExit:a}){const i=s.useRef(null),x=s.useRef(t),v=O(n);s.useEffect(()=>{t?x.current=!0:v(i.current)},[t,v]);const E=Ce(i,e.ref),h=s.cloneElement(e,{ref:E});return t?h:a||!x.current&&r?null:h}const Kt=["onEnter","onEntering","onEntered","onExit","onExiting","onExited","addEndListener","children"];function Pt(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)>=0)continue;n[r]=e[r]}return n}function Xt(e){let{onEnter:t,onEntering:n,onEntered:r,onExit:a,onExiting:i,onExited:x,addEndListener:v,children:E}=e,h=Pt(e,Kt);const m=s.useRef(null),y=Ce(m,Et(E)),c=S=>A=>{S&&m.current&&S(m.current,A)},f=s.useCallback(c(t),[t]),j=s.useCallback(c(n),[n]),F=s.useCallback(c(r),[r]),W=s.useCallback(c(a),[a]),b=s.useCallback(c(i),[i]),_=s.useCallback(c(x),[x]),D=s.useCallback(c(v),[v]);return Object.assign({},h,{nodeRef:m},t&&{onEnter:f},n&&{onEntering:j},r&&{onEntered:F},a&&{onExit:W},i&&{onExiting:b},x&&{onExited:_},v&&{addEndListener:D},{children:typeof E=="function"?(S,A)=>E(S,Object.assign({},A,{ref:y})):s.cloneElement(E,{ref:y})})}const Vt=["component"];function Gt(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)>=0)continue;n[r]=e[r]}return n}const zt=s.forwardRef((e,t)=>{let{component:n}=e,r=Gt(e,Vt);const a=Xt(r);return o.jsx(n,Object.assign({ref:t},a))});function qt({in:e,onTransition:t}){const n=s.useRef(null),r=s.useRef(!0),a=O(t);return Pe(()=>{if(!n.current)return;let i=!1;return a({in:e,element:n.current,initial:r.current,isStale:()=>i}),()=>{i=!0}},[e,a]),Pe(()=>(r.current=!1,()=>{r.current=!0}),[]),n}function Jt({children:e,in:t,onExited:n,onEntered:r,transition:a}){const[i,x]=s.useState(!t);t&&i&&x(!1);const v=qt({in:!!t,onTransition:h=>{const m=()=>{h.isStale()||(h.in?r==null||r(h.element,h.initial):(x(!0),n==null||n(h.element)))};Promise.resolve(a(h)).then(m,y=>{throw h.in||x(!0),y})}}),E=Ce(v,e.ref);return i&&!t?null:s.cloneElement(e,{ref:E})}function ze(e,t,n){return e?o.jsx(zt,Object.assign({},n,{component:e})):t?o.jsx(Jt,Object.assign({},n,{transition:t})):o.jsx(Yt,Object.assign({},n))}const Qt=["show","role","className","style","children","backdrop","keyboard","onBackdropClick","onEscapeKeyDown","transition","runTransition","backdropTransition","runBackdropTransition","autoFocus","enforceFocus","restoreFocus","restoreFocusOptions","renderDialog","renderBackdrop","manager","container","onShow","onHide","onExit","onExited","onExiting","onEnter","onEntering","onEntered"];function Zt(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)>=0)continue;n[r]=e[r]}return n}let Oe;function en(e){return Oe||(Oe=new Be({ownerDocument:e==null?void 0:e.document})),Oe}function tn(e){const t=$e(),n=e||en(t),r=s.useRef({dialog:null,backdrop:null});return Object.assign(r.current,{add:()=>n.add(r.current),remove:()=>n.remove(r.current),isTopModal:()=>n.isTopModal(r.current),setDialogRef:s.useCallback(a=>{r.current.dialog=a},[]),setBackdropRef:s.useCallback(a=>{r.current.backdrop=a},[])})}const ot=s.forwardRef((e,t)=>{let{show:n=!1,role:r="dialog",className:a,style:i,children:x,backdrop:v=!0,keyboard:E=!0,onBackdropClick:h,onEscapeKeyDown:m,transition:y,runTransition:c,backdropTransition:f,runBackdropTransition:j,autoFocus:F=!0,enforceFocus:W=!0,restoreFocus:b=!0,restoreFocusOptions:_,renderDialog:D,renderBackdrop:S=u=>o.jsx("div",Object.assign({},u)),manager:A,container:Z,onShow:V,onHide:H=()=>{},onExit:he,onExited:G,onExiting:ae,onEnter:ee,onEntering:te,onEntered:ie}=e,ne=Zt(e,Qt);const L=$e(),T=Ut(Z),g=tn(A),$=Ze(),se=kt(n),[B,z]=s.useState(!n),N=s.useRef(null);s.useImperativeHandle(t,()=>g,[g]),ve&&!se&&n&&(N.current=Se(L==null?void 0:L.document)),n&&B&&z(!1);const w=O(()=>{if(g.add(),U.current=Ye(document,"keydown",I),J.current=Ye(document,"focus",()=>setTimeout(R),!0),V&&V(),F){var u,ce;const re=Se((u=(ce=g.dialog)==null?void 0:ce.ownerDocument)!=null?u:L==null?void 0:L.document);g.dialog&&re&&!Xe(g.dialog,re)&&(N.current=re,g.dialog.focus())}}),q=O(()=>{if(g.remove(),U.current==null||U.current(),J.current==null||J.current(),b){var u;(u=N.current)==null||u.focus==null||u.focus(_),N.current=null}});s.useEffect(()=>{!n||!T||w()},[n,T,w]),s.useEffect(()=>{B&&q()},[B,q]),Le(()=>{q()});const R=O(()=>{if(!W||!$()||!g.isTopModal())return;const u=Se(L==null?void 0:L.document);g.dialog&&u&&!Xe(g.dialog,u)&&g.dialog.focus()}),le=O(u=>{u.target===u.currentTarget&&(h==null||h(u),v===!0&&H())}),I=O(u=>{E&&yt(u)&&g.isTopModal()&&(m==null||m(u),u.defaultPrevented||H())}),J=s.useRef(),U=s.useRef(),M=(...u)=>{z(!0),G==null||G(...u)};if(!T)return null;const C=Object.assign({role:r,ref:g.setDialogRef,"aria-modal":r==="dialog"?!0:void 0},ne,{style:i,className:a,tabIndex:-1});let Y=D?D(C):o.jsx("div",Object.assign({},C,{children:s.cloneElement(x,{role:"document"})}));Y=ze(y,c,{unmountOnExit:!0,mountOnEnter:!0,appear:!0,in:!!n,onExit:he,onExiting:ae,onExited:M,onEnter:ee,onEntering:te,onEntered:ie,children:Y});let K=null;return v&&(K=S({ref:g.setBackdropRef,onClick:le}),K=ze(f,j,{in:!!n,appear:!0,mountOnEnter:!0,unmountOnExit:!0,children:K})),o.jsx(o.Fragment,{children:Rt.createPortal(o.jsxs(o.Fragment,{children:[K,Y]}),T)})});ot.displayName="Modal";const nn=Object.assign(ot,{Manager:Be});function sn(e,t){return e.classList?e.classList.contains(t):(" "+(e.className.baseVal||e.className)+" ").indexOf(" "+t+" ")!==-1}function rn(e,t){e.classList?e.classList.add(t):sn(e,t)||(typeof e.className=="string"?e.className=e.className+" "+t:e.setAttribute("class",(e.className&&e.className.baseVal||"")+" "+t))}function qe(e,t){return e.replace(new RegExp("(^|\\s)"+t+"(?:\\s|$)","g"),"$1").replace(/\s+/g," ").replace(/^\s*|\s*$/g,"")}function on(e,t){e.classList?e.classList.remove(t):typeof e.className=="string"?e.className=qe(e.className,t):e.setAttribute("class",qe(e.className&&e.className.baseVal||"",t))}const fe={FIXED_CONTENT:".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",STICKY_CONTENT:".sticky-top",NAVBAR_TOGGLER:".navbar-toggler"};class an extends Be{adjustAndStore(t,n,r){const a=n.style[t];n.dataset[t]=a,ge(n,{[t]:`${parseFloat(ge(n,t))+r}px`})}restore(t,n){const r=n.dataset[t];r!==void 0&&(delete n.dataset[t],ge(n,{[t]:r}))}setContainerStyle(t){super.setContainerStyle(t);const n=this.getElement();if(rn(n,"modal-open"),!t.scrollBarWidth)return;const r=this.isRTL?"paddingLeft":"paddingRight",a=this.isRTL?"marginLeft":"marginRight";de(n,fe.FIXED_CONTENT).forEach(i=>this.adjustAndStore(r,i,t.scrollBarWidth)),de(n,fe.STICKY_CONTENT).forEach(i=>this.adjustAndStore(a,i,-t.scrollBarWidth)),de(n,fe.NAVBAR_TOGGLER).forEach(i=>this.adjustAndStore(a,i,t.scrollBarWidth))}removeContainerStyle(t){super.removeContainerStyle(t);const n=this.getElement();on(n,"modal-open");const r=this.isRTL?"paddingLeft":"paddingRight",a=this.isRTL?"marginLeft":"marginRight";de(n,fe.FIXED_CONTENT).forEach(i=>this.restore(r,i)),de(n,fe.STICKY_CONTENT).forEach(i=>this.restore(a,i)),de(n,fe.NAVBAR_TOGGLER).forEach(i=>this.restore(a,i))}}let Ie;function ln(e){return Ie||(Ie=new an(e)),Ie}const at=s.forwardRef(({className:e,bsPrefix:t,as:n="div",...r},a)=>(t=X(t,"modal-body"),o.jsx(n,{ref:a,className:k(e,t),...r})));at.displayName="ModalBody";const it=s.createContext({onHide(){}}),Fe=s.forwardRef(({bsPrefix:e,className:t,contentClassName:n,centered:r,size:a,fullscreen:i,children:x,scrollable:v,...E},h)=>{e=X(e,"modal");const m=`${e}-dialog`,y=typeof i=="string"?`${e}-fullscreen-${i}`:`${e}-fullscreen`;return o.jsx("div",{...E,ref:h,className:k(m,t,a&&`${e}-${a}`,r&&`${m}-centered`,v&&`${m}-scrollable`,i&&y),children:o.jsx("div",{className:k(`${e}-content`,n),children:x})})});Fe.displayName="ModalDialog";const lt=s.forwardRef(({className:e,bsPrefix:t,as:n="div",...r},a)=>(t=X(t,"modal-footer"),o.jsx(n,{ref:a,className:k(e,t),...r})));lt.displayName="ModalFooter";const cn=s.forwardRef(({closeLabel:e="Close",closeVariant:t,closeButton:n=!1,onHide:r,children:a,...i},x)=>{const v=s.useContext(it),E=O(()=>{v==null||v.onHide(),r==null||r()});return o.jsxs("div",{ref:x,...i,children:[a,n&&o.jsx(Ct,{"aria-label":e,variant:t,onClick:E})]})}),ct=s.forwardRef(({bsPrefix:e,className:t,closeLabel:n="Close",closeButton:r=!1,...a},i)=>(e=X(e,"modal-header"),o.jsx(cn,{ref:i,...a,className:k(t,e),closeLabel:n,closeButton:r})));ct.displayName="ModalHeader";const un=jt("h4"),ut=s.forwardRef(({className:e,bsPrefix:t,as:n=un,...r},a)=>(t=X(t,"modal-title"),o.jsx(n,{ref:a,className:k(e,t),...r})));ut.displayName="ModalTitle";function dn(e){return o.jsx(Qe,{...e,timeout:null})}function fn(e){return o.jsx(Qe,{...e,timeout:null})}const dt=s.forwardRef(({bsPrefix:e,className:t,style:n,dialogClassName:r,contentClassName:a,children:i,dialogAs:x=Fe,"data-bs-theme":v,"aria-labelledby":E,"aria-describedby":h,"aria-label":m,show:y=!1,animation:c=!0,backdrop:f=!0,keyboard:j=!0,onEscapeKeyDown:F,onShow:W,onHide:b,container:_,autoFocus:D=!0,enforceFocus:S=!0,restoreFocus:A=!0,restoreFocusOptions:Z,onEntered:V,onExit:H,onExiting:he,onEnter:G,onEntering:ae,onExited:ee,backdropClassName:te,manager:ie,...ne},L)=>{const[T,g]=s.useState({}),[$,se]=s.useState(!1),B=s.useRef(!1),z=s.useRef(!1),N=s.useRef(null),[w,q]=St(),R=Ce(L,q),le=O(b),I=Je();e=X(e,"modal");const J=s.useMemo(()=>({onHide:le}),[le]);function U(){return ie||ln({isRTL:I})}function M(d){if(!ve)return;const Q=U().getScrollbarWidth()>0,ye=d.scrollHeight>Ae(d).documentElement.clientHeight;g({paddingRight:Q&&!ye?Ve():void 0,paddingLeft:!Q&&ye?Ve():void 0})}const C=O(()=>{w&&M(w.dialog)});Le(()=>{Ke(window,"resize",C),N.current==null||N.current()});const Y=()=>{B.current=!0},K=d=>{B.current&&w&&d.target===w.dialog&&(z.current=!0),B.current=!1},u=()=>{se(!0),N.current=bt(w.dialog,()=>{se(!1)})},ce=d=>{d.target===d.currentTarget&&u()},re=d=>{if(f==="static"){ce(d);return}if(z.current||d.target!==d.currentTarget){z.current=!1;return}b==null||b()},je=d=>{j?F==null||F(d):(d.preventDefault(),f==="static"&&u())},Te=(d,Q)=>{d&&M(d),G==null||G(d,Q)},be=d=>{N.current==null||N.current(),H==null||H(d)},Ne=(d,Q)=>{ae==null||ae(d,Q),Tt(window,"resize",C)},we=d=>{d&&(d.style.display=""),ee==null||ee(d),Ke(window,"resize",C)},xe=s.useCallback(d=>o.jsx("div",{...d,className:k(`${e}-backdrop`,te,!c&&"show")}),[c,te,e]),oe={...n,...T};oe.display="block";const Ee=d=>o.jsx("div",{role:"dialog",...d,style:oe,className:k(t,e,$&&`${e}-static`,!c&&"show"),onClick:f?re:void 0,onMouseUp:K,"data-bs-theme":v,"aria-label":m,"aria-labelledby":E,"aria-describedby":h,children:o.jsx(x,{...ne,onMouseDown:Y,className:r,contentClassName:a,children:i})});return o.jsx(it.Provider,{value:J,children:o.jsx(nn,{show:y,ref:R,backdrop:f,container:_,keyboard:!0,autoFocus:D,enforceFocus:S,restoreFocus:A,restoreFocusOptions:Z,onEscapeKeyDown:je,onShow:W,onHide:b,onEnter:Te,onEntering:Ne,onEntered:V,onExit:be,onExiting:he,onExited:we,manager:U(),transition:c?dn:void 0,backdropTransition:c?fn:void 0,renderBackdrop:xe,renderDialog:Ee})})});dt.displayName="Modal";const pe=Object.assign(dt,{Body:at,Header:ct,Title:ut,Footer:lt,Dialog:Fe,TRANSITION_DURATION:300,BACKDROP_TRANSITION_DURATION:150}),mn=()=>{const e=Nt(c=>c.user.user),t=e==null?void 0:e.id,[n,r]=s.useState([]),[a,i]=s.useState(null),[x,v]=s.useState(!1),[E,h]=s.useState(!1);s.useEffect(()=>{if(!t)return;(async()=>{h(!0);try{const f=await Mt.get("/DiysByProvider",{params:{providerId:t}});r(f.data.diy||[])}catch(f){console.error("Error fetching DIYs:",f)}h(!1)})()},[t]);const m=c=>{i(c),v(!0)},y=()=>{v(!1),i(null)};return o.jsxs("div",{className:"mt-5",children:[o.jsx("h4",{className:"headingStyle",children:"Your Previous Tips"}),E?o.jsx("p",{children:"Loading..."}):n.length>0?o.jsx("div",{className:"row",children:n.map(c=>o.jsx("div",{className:"col-md-12 mb-4",children:o.jsxs("div",{className:"diyCard",children:[o.jsx("div",{className:"carousel-container",children:o.jsxs(ue,{controls:!1,interval:3e3,children:[c.photos.map((f,j)=>o.jsx(ue.Item,{children:o.jsx("img",{className:"d-block w-100 carousel-image",src:`http://http://44.202.124.202/api/${f}`,alt:`DIY Photo ${j+1}`})},`photo-${j}`)),c.vedios.map((f,j)=>o.jsx(ue.Item,{children:o.jsxs("video",{className:"d-block w-100 carousel-image",controls:!0,autoPlay:!0,muted:!0,loop:!0,children:[o.jsx("source",{src:`http://http://44.202.124.202/api/${f}`,type:"video/mp4"}),"Your browser does not support the video tag."]})},`video-${j}`))]})}),o.jsxs("div",{className:"card-body ml-5",children:[o.jsx("h5",{className:"titleStyle",children:c.ditTitle}),o.jsx("p",{className:"card-text",children:c.purpose}),o.jsx("button",{className:"diyLink",onClick:()=>m(c),children:"More Details"})]})]})},c._id))}):o.jsx("p",{children:"No DIY tips added yet."}),a&&o.jsxs(pe,{show:x,onHide:y,size:"lg",children:[o.jsx(pe.Header,{closeButton:!0,children:o.jsx(pe.Title,{children:a.ditTitle})}),o.jsxs(pe.Body,{children:[o.jsxs("p",{children:[o.jsx("strong",{children:"Purpose:"})," ",a.purpose]}),o.jsxs("p",{children:[o.jsx("strong",{children:"Materials Required:"})," ",a.materialsRequired.join(", ")]}),o.jsxs("p",{children:[o.jsx("strong",{children:"Category:"})," ",a.category]}),o.jsxs("p",{children:[o.jsx("strong",{children:"Safety Tips:"})," ",a.safetyTips.join(", ")]}),o.jsxs("p",{children:[o.jsx("strong",{children:"Additional Notes:"})," ",a.additionalNotes]}),o.jsx("h6",{children:"Steps:"}),o.jsx("ol",{children:a.steps.map((c,f)=>o.jsxs("li",{children:[o.jsx("strong",{children:c.title}),": ",c.description]},f))}),o.jsx("h6",{children:"Media:"}),o.jsxs(ue,{children:[a.photos.map((c,f)=>o.jsx(ue.Item,{children:o.jsx("img",{className:"d-block w-100",src:`http://http://44.202.124.202/api/${c}`,alt:`DIY Photo ${f+1}`})},`modal-photo-${f}`)),a.vedios.map((c,f)=>o.jsx(ue.Item,{children:o.jsxs("video",{className:"d-block w-100",controls:!0,autoPlay:!0,muted:!0,loop:!0,children:[o.jsx("source",{src:`http://http://44.202.124.202/api/${c}`,type:"video/mp4"}),"Your browser does not support the video tag."]})},`modal-video-${f}`))]})]}),o.jsx(pe.Footer,{children:o.jsx(wt,{variant:"secondary",onClick:y,children:"Close"})})]})]})};export{mn as default};
