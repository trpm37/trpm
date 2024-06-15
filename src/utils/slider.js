import Hammer from 'hammerjs';
import {addStyle,getWidth,getPosition} from './utils';

import img1 from  '@/assets/images/drag_left.png';
import img2 from  '@/assets/images/drag_right.png';
import img3 from  '@/assets/images/drag_center.png';

const style_id="trpm-slider-style";
const style_css=`.trpm-slider{display: flex;align-items: center;}
.trpm-slider .bar{position: relative; display: flex;align-items: center;flex: 1;height: 6px;background-color: #28282B;border-radius: 8px;}
.trpm-slider .per{position: absolute;left: 0;top: 0;z-index: 1; width: 50%;height: 100%; background-color: #307AF2;border-radius: 8px;}
.trpm-slider .handle{display: flex; position: absolute;right: 0px;top: -2px;width: 5px; height: 10px;border-radius: 2px;background-color: #fff; cursor: e-resize;}
.trpm-slider .bar-inp{display: flex;align-items;justify-content: space-between;width: 100%;}
.trpm-slider .bar-inp>div{text-align: center;}
.trpm-slider .bar-inp .inp input{width: 30px;border: none;background-color: transparent;background-color:#28282b;border-radius: 5px;color:#fff;text-align: center;}
.trpm-slider.multi{flex-direction: column;padding: 10px 0px;}
.trpm-slider.multi .bar{flex: none;width: 100%;}
.trpm-slider.multi .per{width: 100%; border-radius: 0;}
.trpm-slider.multi .handle{top: 0px;z-index: 2; width: 6px; height: 14px;background-color: transparent;background-repeat: no-repeat;background-position: center;background-size: 100% 100%;}
.trpm-slider.multi .handle-lf{left: -6px;background-image: url(${img1});}
.trpm-slider.multi .handle-rg{right: -6px;background-image: url(${img2});}
.trpm-slider.multi .handle-ct{top: unset;left: calc(50% - 4px);bottom:0;width: 8px; height: 16px;background-image: url(${img3});}
.trpm-slider.multi .bar-inp{margin-top:14px;}
.trpm-slider.multi .bar-inp .lab{padding-top:5px;font-size:12px;}`;
const sty=function(){
    if(! document.getElementById(style_id)){
        addStyle({id:style_id,css:style_css});
    }
}
export function slider(params){
    //selector装滑块的选择器/dom min最小值 max最大值 perVal每份[值] val当前值
    let {selector,min = 0, max = 100, perVal = 1,  callBack,endCallBack,yz_callBack}=params;
    let {val = (max+min)/2}=params;
    sty();
    let htmlString=`<div class="trpm-slider">
        <div class="bar">
            <div class="per"><span class="handle"></span></div>                                                
        </div>
    </div>`;

    const dom = typeof selector=='string' ? document.querySelector(selector) : selector;
    if (dom) {
        // // 将HTML字符串转换为DOM节点
        // const tempDiv = document.createElement('div');
        // tempDiv.innerHTML = htmlString.trim();
        // dom.htmlString=tempDiv.firstChild;
        dom.innerHTML=htmlString;

        let pointer_dom = dom.querySelector(".handle");
        //sumVal总值 copies总份数
        let sumVal = max - min;
        let copies = sumVal / perVal;
        //_w总宽度 perW每份[宽度]  bar_w进度条宽度
        let _w = getWidth(dom);
        let [perW, bar_w] = [_w / copies, 0];

        //pointer_w指针宽度 pointer_lf指针距离左侧距离 pointer_val指针值
        let [pointer_w, pointer_lf, pointer_val] = [pointer_dom.offsetWidth, 0, val];

        //初始化
        function init() {
            pointer_lf = (pointer_val - min) / perVal * perW;
            if (pointer_lf > _w) {
                pointer_lf = _w;
            }
            else if (pointer_lf < 0) {
                pointer_lf = 0;
            }
            bar_w = pointer_lf + pointer_w;

            pointer_dom.style.left = pointer_lf + "px" ;
            dom.querySelector(".per").style.width = bar_w + "px" ;
        }
        init();

        //验证回调
        function yzCallBack() {
            let yz = true;
            if (yz_callBack && typeof yz_callBack == 'function') {
                yz = yz_callBack();
            }
            return yz;
        }

        let pointer_hammer = new Hammer(pointer_dom);
        pointer_hammer.on("panstart", function (ev) {
            let re = yzCallBack();
            if (!re) {
                return;
            }
            _w = getWidth(dom) - pointer_w;//总宽度
            perW = _w / copies;//perW每份[宽度]
            pointer_lf = getPosition(pointer_dom).left;
            pointer_dom.style.left = pointer_lf + "px" ;
            dom.setAttribute('data-w',_w) ;
            // console.log({"拖动开始":"panstart","perW":perW,"pointer_lf":pointer_lf,"w":_w});
        });
        pointer_hammer.on("panmove", function (ev) {
            let re = yzCallBack();
            if (!re) {
                return;
            }
            let lf = ev.deltaX + pointer_lf; //当前指针居左距离
            if (lf < 0) {
                lf = 0;
                bar_w = pointer_w;
                pointer_val = min;
            }
            else if (lf > _w) {
                lf = _w;
                bar_w = _w + pointer_w;
                pointer_val = max;
            }
            else {
                bar_w = lf + pointer_w;
                let cur_copies = lf / perW;//移动份数
                pointer_val = cur_copies * perVal + min;
            }
            pointer_dom.style.left = lf + "px" ;
            dom.querySelector(".per").style.width = bar_w + "px" ;
            // console.log({"拖动":"panmove","perW":perW,"_w":_w,"bar_w":bar_w,"pointer_lf":lf,"pointer_val":pointer_val});
            //回调
            if (callBack && typeof callBack=='function') {
                callBack({ "val": pointer_val });
            }
        });
        pointer_hammer.on("panend", function (ev) {
            let re = yzCallBack();
            if (!re) {
                return;
            }
            pointer_lf = getPosition(pointer_dom).left;
            // console.log({"拖动结束":"panend","ev":ev,"pointer_lf":pointer_lf});
            //回调
            if (endCallBack && typeof endCallBack=='function') {
                endCallBack({ "val": pointer_val });
            }
        });
    }

    
}
export function sliderRange(params){
    //selector装滑块的选择器/dom min最小值 max最大值 perVal每份[值] val当前值
    let {selector,min = 0, max = 100, perVal = 1,isInp=true, callBack,endCallBack,yz_callBack}=params;
    let {lf_val = min, rg_val = max}=params;
    console.log({lf_val,rg_val});
    sty();
    let htmlString=`<div class="trpm-slider multi">
        <div class="bar">
            <div class="per"></div>   
            <span class="handle handle-lf"></span>
            <span class="handle handle-rg"></span>                                          
        </div>
        <div class="bar-inp" style="${isInp ? '' : 'display:none;'}">
            <div class="lf-inp">
                <div class="inp"><input type="text" class="lf_val" placeholder=""></div>
                <div class="lab">最小</div>
            </div>  
            <div class="rg-inp">
                <div class="inp"><input type="text" class="rg_val" placeholder=""></div>
                <div class="lab">最大</div>
            </div>                                               
        </div>
    </div>`;

    //dom装滑块的盒子
    const dom = typeof selector=='string' ? document.querySelector(selector) : selector;
    if (dom) {
        // // 将HTML字符串转换为DOM节点
        // const tempDiv = document.createElement('div');
        // tempDiv.innerHTML = htmlString.trim();
        // dom.htmlString=tempDiv.firstChild;
        dom.innerHTML=htmlString;

        //lfPointer_dom左侧指针 rgPointer_dom右侧指针
        let [lfPointer_dom, rgPointer_dom] = [dom.querySelector(".handle-lf"), dom.querySelector(".handle-rg")];
        //min最小值 max最大值 perVal每份[值]
        let _val = max - min;//总值
        let copies = _val / perVal;//总份数

        //_w总宽度 perW每份[宽度]  bar_w进度条宽度 bar_lf进度条距左侧距离 
        let _w = getWidth(dom);
        let [perW, bar_w, bar_lf] = [_w / copies, 0, 0];

        //lfPointer_w宽度 lfPointer_lf指针距离左侧距离 lfPointer_val指针值
        let [lfPointer_w, lfPointer_lf, lfPointer_val] = [lfPointer_dom.offsetWidth, getPosition(lfPointer_dom).left, lf_val];

        //rgPointer_w宽度 rgPointer_lf指针距离左侧距离  rgPointer_val指针值
        let [rgPointer_w, rgPointer_lf, rgPointer_val] = [rgPointer_dom.offsetWidth, getPosition(rgPointer_dom).left, rg_val];

        //初始化
        function init() {
            //左侧指针
            lfPointer_lf = (lfPointer_val - min) / perVal * perW;
            if (lfPointer_lf >= _w) {
                lfPointer_lf = _w - lfPointer_w;
            }
            else if (lfPointer_lf <= 0) {
                lfPointer_lf = -lfPointer_w;
            }

            //右侧指针
            rgPointer_lf = (rgPointer_val - min) / perVal * perW;
            if (rgPointer_lf > _w) {
                rgPointer_lf = _w;
            }
            else if (rgPointer_lf < 0) {
                rgPointer_lf = 0;
            }

            bar_lf = lfPointer_lf > 0 ? (lfPointer_lf + lfPointer_w) : 0;
            bar_w = rgPointer_lf - bar_lf;

            console.log({lfPointer_lf,rgPointer_lf, bar_lf,bar_w});

            lfPointer_dom.style.left = lfPointer_lf + "px" ;
            rgPointer_dom.style.left = rgPointer_lf + "px" ;
            dom.querySelector(".per").style.left = bar_lf + "px" ;
            dom.querySelector(".per").style.width = bar_w + "px" ; 

            dom.querySelector(".lf_val").value=lfPointer_val;
            dom.querySelector(".rg_val").value=rgPointer_val;
        }
        init();

        //左侧当前值
        function getLfVal(o) {
            _w = getWidth(dom);//总宽度
            perW = _w / copies;//perW每份[宽度]
            let lf = null;
            if (o && o.lf) {
                lf = o.lf;
            }
            else {
                lfPointer_lf = getPosition(lfPointer_dom).left;
                lf = lfPointer_lf;
            }

            if (lf <= 0) {//最左侧
                lfPointer_val = min;
            }
            else {
                let lfPointer_copies = lf / perW;//移动份数
                lfPointer_val = lfPointer_copies * perVal + min;
            }
        }

        //右侧当前值
        function getRgVal(o) {
            _w = getWidth(dom);//总宽度
            perW = _w / copies;//perW每份[宽度]
            let lf = null;
            if (o && o.lf) {
                lf = o.lf;
            }
            else {
                rgPointer_lf = getPosition(rgPointer_dom).left;
                lf = rgPointer_lf;
            }

            if (lf > _w) {//最右侧
                rgPointer_val = max;
            }
            else {
                let rgPointer_copies = (lf) / perW;//移动份数
                rgPointer_val = rgPointer_copies * perVal + min;
            }
        }

        //验证回调
        function yzCallBack() {
            let yz = true;
            if (yz_callBack && typeof yz_callBack == 'function') {
                yz = yz_callBack();
            }
            return yz;
        }

        //左侧指针拖动
        let lfPointer_hammer = new Hammer(lfPointer_dom);
        lfPointer_hammer.on("panstart", function (ev) {
            let re = yzCallBack();
            if (!re) {
                return;
            }
            getLfVal();
            getRgVal();
            lfPointer_dom.style.left = lfPointer_lf ;
            dom.setAttribute('data-w',_w) ;
            // console.log({"拖动开始":"panmove","perW":perW,"lfPointer_val":lfPointer_val,"rgPointer_val":rgPointer_val});
        });
        lfPointer_hammer.on("panmove", function (ev) {
            let re = yzCallBack();
            if (!re) {
                return;
            }
            // lf指针居左距离
            let [lf] = [ev.deltaX + lfPointer_lf];
            if (lf > rgPointer_lf) {//大于右侧指针距左距离
                lf = rgPointer_lf;
                lfPointer_val = rgPointer_val;
            }
            else {
                if (lf <= 0) {//最左侧
                    lf = 0 - lfPointer_w;
                }
                getLfVal({ lf });
            }

            bar_lf = lf > 0 ? (lf + lfPointer_w) : 0;
            bar_w = rgPointer_lf - bar_lf;
            lfPointer_dom.style.left = lf + "px" ;
            dom.querySelector(".per").style.left = bar_lf + "px" ;
            dom.querySelector(".per").style.width = bar_w + "px" ;
            // console.log({"拖动":"panmove","lf":lf,"bar_w":bar_w,"bar_lf":bar_lf,"lfPointer_val":lfPointer_val,"rgPointer_val":rgPointer_val});
            //回调
            if (callBack && typeof callBack=='function') {
                callBack({ "lf_val": lfPointer_val, "rg_val": rgPointer_val });
            }
        });
        lfPointer_hammer.on("panend", function (ev) {
            let re = yzCallBack();
            if (!re) {
                return;
            }
            lfPointer_lf = getPosition(lfPointer_dom).left;
            // console.log({"拖动结束":"panend","ev":ev,"lfPointer_lf":lfPointer_lf});
            //回调
            if (endCallBack && typeof endCallBack=='function') {
                endCallBack({ "lf_val": lfPointer_val, "rg_val": rgPointer_val});
            }
        });

        //右侧指针拖动
        let rgPointer_hammer = new Hammer(rgPointer_dom);
        rgPointer_hammer.on("panstart", function (ev) {
            let re = yzCallBack();
            if (!re) {
                return;
            }
            getLfVal();
            getRgVal();
            rgPointer_dom.style.left = rgPointer_lf ;
            dom.setAttribute('data-w',_w) ;
            // console.log({"拖动开始":"panstart","perW":perW,"rgPointer_lf":rgPointer_lf,"w":_w});
        });
        rgPointer_hammer.on("panmove", function (ev) {
            let re = yzCallBack();
            if (!re) {
                return;
            }
            // lf指针居左距离 val指针值 w进度条宽度
            let [lf] = [ev.deltaX + rgPointer_lf];
            if (lf < lfPointer_lf) {//小于中间指针距左距离
                lf = lfPointer_lf;
                rgPointer_val = lfPointer_val;
            }
            else {
                if (lf > _w) {//最右侧
                    lf = _w;
                }
                getRgVal({ lf });
            }

            bar_w = lf - lfPointer_lf - lfPointer_w;
            rgPointer_dom.style.left = lf + "px" ;
            dom.querySelector(".per").style.width = bar_w + "px" ;
            // console.log({"拖动":"panmove","lf":lf,"bar_w":bar_w,"lfPointer_val":lfPointer_val,"rgPointer_val":rgPointer_val});
            //回调
            if (callBack && typeof callBack=='function') {
                callBack({ "lf_val": lfPointer_val, "rg_val": rgPointer_val});
            }
        });
        rgPointer_hammer.on("panend", function (ev) {
            let re = yzCallBack();
            if (!re) {
                return;
            }
            rgPointer_lf = getPosition(rgPointer_dom).left;
            // console.log({"拖动结束":"panend","ev":ev,"rgPointer_lf":rgPointer_lf});
            //回调
            if (endCallBack && typeof endCallBack=='function') {
                endCallBack({ "lf_val": lfPointer_val, "rg_val": rgPointer_val});
            }
        });

        dom.querySelector(".lf_val").addEventListener('blur', function() {
            let val=this.value;
            lfPointer_val=val;
            init();
        });
        dom.querySelector(".rg_val").addEventListener('blur', function() {
            let val=this.value;
            rgPointer_val=val;
            init();
        });          
    }

    
}
export function sliderRange2(params){
    //selector装滑块的选择器/dom min最小值 max最大值 perVal每份[值] val当前值
    let {selector,min = 0, max = 100, perVal = 1,isInp=true, callBack,endCallBack,yz_callBack}=params;
    let {lf_val = min, rg_val = max, ct_val = (max+min)/2}=params;
    console.log({lf_val,rg_val,ct_val});
    sty();
    let htmlString=`<div class="trpm-slider multi">
        <div class="bar">
            <div class="per"></div>   
            <span class="handle handle-lf"></span>
            <span class="handle handle-rg"></span>
            <span class="handle handle-ct"></span>                                             
        </div>
        <div class="bar-inp" style="${isInp ? '' : 'display:none;'}">
            <div class="lf-inp">
                <div class="inp"><input type="text" class="lf_val" placeholder=""></div>
                <div class="lab">最小</div>
            </div>  
            <div class="ct-inp">
                <div class="inp"><input type="text" class="ct_val" placeholder=""></div>
                <div class="lab">初始值</div>
            </div>   
            <div class="rg-inp">
                <div class="inp"><input type="text" class="rg_val" placeholder=""></div>
                <div class="lab">最大</div>
            </div>                                               
        </div>
    </div>`;

    //dom装滑块的盒子
    const dom = typeof selector=='string' ? document.querySelector(selector) : selector;
    if (dom) {
        // // 将HTML字符串转换为DOM节点
        // const tempDiv = document.createElement('div');
        // tempDiv.innerHTML = htmlString.trim();
        // dom.htmlString=tempDiv.firstChild;
        dom.innerHTML=htmlString;

        //lfPointer_dom左侧指针 rgPointer_dom右侧指针 ctPointer_dom中间指针
        let [lfPointer_dom, rgPointer_dom, ctPointer_dom] = [dom.querySelector(".handle-lf"), dom.querySelector(".handle-rg"), dom.querySelector(".handle-ct")];
        //min最小值 max最大值 perVal每份[值]
        let _val = max - min;//总值
        let copies = _val / perVal;//总份数

        //_w总宽度 perW每份[宽度]  bar_w进度条宽度 bar_lf进度条距左侧距离 
        let _w = getWidth(dom);
        let [perW, bar_w, bar_lf] = [_w / copies, 0, 0];

        //lfPointer_w宽度 lfPointer_lf指针距离左侧距离 lfPointer_val指针值
        let [lfPointer_w, lfPointer_lf, lfPointer_val] = [lfPointer_dom.offsetWidth, getPosition(lfPointer_dom).left, lf_val];

        //rgPointer_w宽度 rgPointer_lf指针距离左侧距离  rgPointer_val指针值
        let [rgPointer_w, rgPointer_lf, rgPointer_val] = [rgPointer_dom.offsetWidth, getPosition(rgPointer_dom).left, rg_val];

        //ctPointer_w宽度 ctPointer_lf指针距离左侧距离  ctPointer_val指针值
        let [ctPointer_w, ctPointer_lf, ctPointer_val] = [ctPointer_dom.offsetWidth, getPosition(ctPointer_dom).left, ct_val];

        //初始化
        function init() {
            //左侧指针
            lfPointer_lf = (lfPointer_val - min) / perVal * perW;
            if (lfPointer_lf >= _w) {
                lfPointer_lf = _w - lfPointer_w;
            }
            else if (lfPointer_lf <= 0) {
                lfPointer_lf = -lfPointer_w;
            }

            //右侧指针
            rgPointer_lf = (rgPointer_val - min) / perVal * perW;
            if (rgPointer_lf > _w) {
                rgPointer_lf = _w;
            }
            else if (rgPointer_lf < 0) {
                rgPointer_lf = 0;
            }

            //中间指针            
            ctPointer_lf = (ctPointer_val - min) / perVal * perW - ctPointer_w / 2;
            if (ctPointer_lf >= _w) {
                ctPointer_lf = _w - ctPointer_w / 2;
            }
            else if (ctPointer_lf <= 0) {
                ctPointer_lf = -ctPointer_w / 2;
            }

            bar_lf = lfPointer_lf > 0 ? (lfPointer_lf + lfPointer_w) : 0;
            bar_w = rgPointer_lf - bar_lf;

            console.log({lfPointer_lf,rgPointer_lf,ctPointer_lf, bar_lf,bar_w});

            lfPointer_dom.style.left = lfPointer_lf + "px" ;
            rgPointer_dom.style.left = rgPointer_lf + "px" ;
            ctPointer_dom.style.left = ctPointer_lf + "px" ;
            dom.querySelector(".per").style.left = bar_lf + "px" ;
            dom.querySelector(".per").style.width = bar_w + "px" ; 

            dom.querySelector(".lf_val").value=lfPointer_val;
            dom.querySelector(".rg_val").value=rgPointer_val;
            dom.querySelector(".ct_val").value=ctPointer_val;
        }
        init();

        //左侧当前值
        function getLfVal(o) {
            _w = getWidth(dom);//总宽度
            perW = _w / copies;//perW每份[宽度]
            let lf = null;
            if (o && o.lf) {
                lf = o.lf;
            }
            else {
                lfPointer_lf = getPosition(lfPointer_dom).left;
                lf = lfPointer_lf;
            }

            if (lf <= 0) {//最左侧
                lfPointer_val = min;
            }
            else {
                let lfPointer_copies = lf / perW;//移动份数
                lfPointer_val = lfPointer_copies * perVal + min;
            }
        }

        //右侧当前值
        function getRgVal(o) {
            _w = getWidth(dom);//总宽度
            perW = _w / copies;//perW每份[宽度]
            let lf = null;
            if (o && o.lf) {
                lf = o.lf;
            }
            else {
                rgPointer_lf = getPosition(rgPointer_dom).left;
                lf = rgPointer_lf;
            }

            if (lf > _w) {//最右侧
                rgPointer_val = max;
            }
            else {
                let rgPointer_copies = (lf) / perW;//移动份数
                rgPointer_val = rgPointer_copies * perVal + min;
            }
        }

        //中间当前值
        function getCtVal(o) {
            _w = getWidth(dom);//总宽度
            perW = _w / copies;//perW每份[宽度]
            let lf = null;
            if (o && o.lf) {
                lf = o.lf;
            }
            else {
                ctPointer_lf = getPosition(ctPointer_dom).left;
                lf = ctPointer_lf;
            }

            let ctPointer_copies = Math.abs((lf + ctPointer_w / 2) / perW);//移动份数
            ctPointer_val = ctPointer_copies * perVal + min;
        }

        //验证回调
        function yzCallBack() {
            let yz = true;
            if (yz_callBack && typeof yz_callBack == 'function') {
                yz = yz_callBack();
            }
            return yz;
        }

        //左侧指针拖动
        let lfPointer_hammer = new Hammer(lfPointer_dom);
        lfPointer_hammer.on("panstart", function (ev) {
            let re = yzCallBack();
            if (!re) {
                return;
            }
            getLfVal();
            getRgVal();
            getCtVal();
            lfPointer_dom.style.left = lfPointer_lf ;
            dom.setAttribute('data-w',_w) ;
            // console.log({"拖动开始":"panmove","perW":perW,"lfPointer_val":lfPointer_val,"rgPointer_val":rgPointer_val,"ctPointer_val":ctPointer_val});
        });
        lfPointer_hammer.on("panmove", function (ev) {
            let re = yzCallBack();
            if (!re) {
                return;
            }
            // lf指针居左距离
            let [lf] = [ev.deltaX + lfPointer_lf];
            if (lf > ctPointer_lf) {//大于中心指针距左距离
                lf = ctPointer_lf;
                lfPointer_val = ctPointer_val;
            }
            else {
                if (lf <= 0) {//最左侧
                    lf = 0 - lfPointer_w;
                }
                getLfVal({ lf });
            }

            bar_lf = lf > 0 ? (lf + lfPointer_w) : 0;
            bar_w = rgPointer_lf - bar_lf;
            lfPointer_dom.style.left = lf + "px" ;
            dom.querySelector(".per").style.left = bar_lf + "px" ;
            dom.querySelector(".per").style.width = bar_w + "px" ;
            // console.log({"拖动":"panmove","lf":lf,"bar_w":bar_w,"bar_lf":bar_lf,"lfPointer_val":lfPointer_val,"rgPointer_val":rgPointer_val,"ctPointer_val":ctPointer_val});
            //回调
            if (callBack && typeof callBack=='function') {
                callBack({ "lf_val": lfPointer_val, "rg_val": rgPointer_val, "ct_val": ctPointer_val });
            }
        });
        lfPointer_hammer.on("panend", function (ev) {
            let re = yzCallBack();
            if (!re) {
                return;
            }
            lfPointer_lf = getPosition(lfPointer_dom).left;
            // console.log({"拖动结束":"panend","ev":ev,"lfPointer_lf":lfPointer_lf});
            //回调
            if (endCallBack && typeof endCallBack=='function') {
                endCallBack({ "lf_val": lfPointer_val, "rg_val": rgPointer_val, "ct_val": ctPointer_val });
            }
        });

        //右侧指针拖动
        let rgPointer_hammer = new Hammer(rgPointer_dom);
        rgPointer_hammer.on("panstart", function (ev) {
            let re = yzCallBack();
            if (!re) {
                return;
            }
            getLfVal();
            getRgVal();
            getCtVal();
            rgPointer_dom.style.left = rgPointer_lf ;
            dom.setAttribute('data-w',_w) ;
            // console.log({"拖动开始":"panstart","perW":perW,"rgPointer_lf":rgPointer_lf,"w":_w});
        });
        rgPointer_hammer.on("panmove", function (ev) {
            let re = yzCallBack();
            if (!re) {
                return;
            }
            // lf指针居左距离 val指针值 w进度条宽度
            let [lf] = [ev.deltaX + rgPointer_lf];
            if (lf < ctPointer_lf) {//小于中间指针距左距离
                lf = ctPointer_lf + ctPointer_w / 2;
                rgPointer_val = ctPointer_val;
            }
            else {
                if (lf > _w) {//最右侧
                    lf = _w;
                }
                getRgVal({ lf });
            }

            bar_w = lf - lfPointer_lf - lfPointer_w;
            rgPointer_dom.style.left = lf + "px" ;
            dom.querySelector(".per").style.width = bar_w + "px" ;
            // console.log({"拖动":"panmove","lf":lf,"bar_w":bar_w,"lfPointer_val":lfPointer_val,"rgPointer_val":rgPointer_val,"ctPointer_val":ctPointer_val});
            //回调
            if (callBack && typeof callBack=='function') {
                callBack({ "lf_val": lfPointer_val, "rg_val": rgPointer_val, "ct_val": ctPointer_val });
            }
        });
        rgPointer_hammer.on("panend", function (ev) {
            let re = yzCallBack();
            if (!re) {
                return;
            }
            rgPointer_lf = getPosition(rgPointer_dom).left;
            // console.log({"拖动结束":"panend","ev":ev,"rgPointer_lf":rgPointer_lf});
            //回调
            if (endCallBack && typeof endCallBack=='function') {
                endCallBack({ "lf_val": lfPointer_val, "rg_val": rgPointer_val, "ct_val": ctPointer_val });
            }
        });

        //中间指针拖动
        let ctPointer_hammer = new Hammer(ctPointer_dom);
        ctPointer_hammer.on("panstart", function (ev) {
            let re = yzCallBack();
            if (!re) {
                return;
            }
            getLfVal();
            getRgVal();
            getCtVal();
            ctPointer_dom.style.left = ctPointer_lf ;
            dom.setAttribute('data-w',_w) ;
            // console.log({"拖动开始":"panmove","perW":perW,"lfPointer_val":lfPointer_val,"rgPointer_val":rgPointer_val,"ctPointer_val":ctPointer_val});
        });
        ctPointer_hammer.on("panmove", function (ev) {
            let re = yzCallBack();
            if (!re) {
                return;
            }
            // lf指针居左距离 val指针值 w进度条宽度
            let [lf] = [ev.deltaX + ctPointer_lf];
            if (lf > (lfPointer_lf + lfPointer_w) && lf < rgPointer_lf) {
                getCtVal({ lf });
            }
            else {
                if (lf <= (lfPointer_lf + lfPointer_w)) {//小于左侧指针距左距离
                    lf = lfPointer_lf + lfPointer_w - ctPointer_w / 2;
                    ctPointer_val = lfPointer_val;
                }
                else if (lf >= rgPointer_lf) {//大于右侧指针距左距离
                    lf = rgPointer_lf - rgPointer_w / 2;
                    ctPointer_val = rgPointer_val;
                }
            }

            ctPointer_dom.style.left = lf + "px" ;            
            // console.log({"拖动":"panmove","lf":lf,"lfPointer_val":lfPointer_val,"rgPointer_val":rgPointer_val,"ctPointer_val":ctPointer_val});
            //回调
            if (callBack && typeof callBack=='function') {
                callBack({ "lf_val": lfPointer_val, "rg_val": rgPointer_val, "ct_val": ctPointer_val });
            }
        });
        ctPointer_hammer.on("panend", function (ev) {
            let re = yzCallBack();
            if (!re) {
                return;
            }
            ctPointer_lf = getPosition(ctPointer_dom).left;
            // console.log({"拖动结束":"panend","ev":ev,"ctPointer_lf":ctPointer_lf});
            //回调
            if (endCallBack && typeof endCallBack=='function') {
                endCallBack({ "lf_val": lfPointer_val, "rg_val": rgPointer_val, "ct_val": ctPointer_val });
            }
        });

        dom.querySelector(".lf_val").addEventListener('blur', function() {
            let val=this.value;
            lfPointer_val=val;
            init();
        });
        dom.querySelector(".rg_val").addEventListener('blur', function() {
            let val=this.value;
            rgPointer_val=val;
            init();
        });
        dom.querySelector(".ct_val").addEventListener('blur', function() {
            let val=this.value;
            ctPointer_val=val;
            init();
        });
    }
}