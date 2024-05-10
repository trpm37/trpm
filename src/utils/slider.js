import Hammer from 'hammerjs';
import {addStyle,getWidth,getPosition} from './index';

import img1 from  '@/assets/images/drag_left.png';
import img2 from  '@/assets/images/drag_right.png';
import img3 from  '@/assets/images/drag_center.png';

const style_id="trpm-slider-style";
const style_css=`.progress-bar{display: flex;align-items: center;}
.progress-bar .lab{padding-right: 10px;}
.progress-bar .val{margin-left: 10px;padding: 1px 6px;border-radius: 8px; background-color: #28282B;}
.progress-bar .bar{position: relative; display: flex;align-items: center;flex: 1;height: 6px;background-color: #28282B;border-radius: 8px;}
.progress-bar .per{position: absolute;left: 0;top: 0;z-index: 1; width: 50%;height: 100%; background-color: #307AF2;border-radius: 8px;}
.progress-bar .handle{display: flex; position: absolute;right: 0px;top: -2px;width: 5px; height: 10px;border-radius: 2px;background-color: #fff; cursor: e-resize;}
.progress-bar.multi{padding: 10px 0px;}
.progress-bar.multi .per{width: 100%; border-radius: 0;}
.progress-bar.multi .handle{top: 0px;z-index: 2; width: 6px; height: 14px;background-color: transparent;background-repeat: no-repeat;background-position: center;background-size: 100% 100%;}
.progress-bar.multi .handle-lf{left: -6px;background-image: url(${img1});}
.progress-bar.multi .handle-rg{right: -6px;background-image: url(${img2});}
.progress-bar.multi .handle-ct{top: unset;left: calc(50% - 4px);bottom:0;width: 8px; height: 16px;background-image: url(${img3});}`;
const sty=function(){
    if(! document.getElementById(style_id)){
        addStyle({id:style_id,css:style_css});
    }
}
export function sliderRange(params){
    let {selector}=params;
    sty();
    let htmlString=`<div class="progress-bar multi x_view-bar mg-b" data-min="-180" data-max="180" data-val="0" data-lf="-180" data-rg="180">
        <div class="bar">
            <div class="per"></div>   
            <span class="handle handle-lf"></span>
            <span class="handle handle-rg"></span>
            <span class="handle handle-ct"></span>                                             
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
        let { min = 0, max = 100, perVal = 1 } = params;
        let _val = max - min;//总值
        let copies = _val / perVal;//总份数

        //_w总宽度 perW每份[宽度]  bar_w进度条宽度 bar_lf进度条距左侧距离 
        let _w = getWidth(dom);
        let [perW, bar_w, bar_lf] = [_w / copies, 0, 0];

        //lfPointer_w宽度 lfPointer_lf指针距离左侧距离 lfPointer_val指针值
        let [lfPointer_w, lfPointer_lf, lfPointer_val] = [lfPointer_dom.offsetWidth, getPosition(lfPointer_dom).left, min];

        //rgPointer_w宽度 rgPointer_lf指针距离左侧距离  rgPointer_val指针值
        let [rgPointer_w, rgPointer_lf, rgPointer_val] = [rgPointer_dom.offsetWidth, getPosition(rgPointer_dom).left, max];

        //ctPointer_w宽度 ctPointer_lf指针距离左侧距离  ctPointer_val指针值
        let [ctPointer_w, ctPointer_lf, ctPointer_val] = [ctPointer_dom.offsetWidth, getPosition(ctPointer_dom).left, 0];

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
            if (params.yz_callBack) {
                yz = params.yz_callBack();
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
            if (params && params.callBack) {
                params.callBack({ "lf_val": lfPointer_val, "rg_val": rgPointer_val, "ct_val": ctPointer_val });
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
            if (params && params.endCallBack) {
                params.endCallBack({ "lf_val": lfPointer_val, "rg_val": rgPointer_val, "ct_val": ctPointer_val });
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
            if (params && params.callBack) {
                params.callBack({ "lf_val": lfPointer_val, "rg_val": rgPointer_val, "ct_val": ctPointer_val });
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
            if (params && params.endCallBack) {
                params.endCallBack({ "lf_val": lfPointer_val, "rg_val": rgPointer_val, "ct_val": ctPointer_val });
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
            if (params && params.callBack) {
                params.callBack({ "lf_val": lfPointer_val, "rg_val": rgPointer_val, "ct_val": ctPointer_val });
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
            if (params && params.endCallBack) {
                params.endCallBack({ "lf_val": lfPointer_val, "rg_val": rgPointer_val, "ct_val": ctPointer_val });
            }
        });
    }

    
}