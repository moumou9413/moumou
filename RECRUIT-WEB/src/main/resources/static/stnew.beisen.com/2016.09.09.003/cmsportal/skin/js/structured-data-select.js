﻿!function($,global){$.fn.extend({structruedDataSelect:function(settings){var self=this,indData=[],defaultSetting={container:"#container",maskDiv:'<div class="bas_s_mask" style="position:fixed;height:100%;width:100%;background: #000;left:0;top:0;opacity:0.5;z-index:98;filter: progid:DXImageTransform.Microsoft.Alpha(opacity=50); -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(opacity=50)";"></div>',commonWrap:"#commonWrap",holder:"#data-list",queueHolder:"#selectQueue",selHolder:"#data-select-list",searchInput:"#searchVal",searchButton:"#searchAct",selNum:"#selNum",totalNum:"#totalNum",resetButton:"#resetAct",clearLink:"#clearSelected",cancelLink:".cancelLink",getAllValues:"#getAllValues",cancelSelect:"#cancelSelect",tabCount:"#tabCount",maxSelected:5,popTitle:"请选择",languageIndex:0,language:"chs",url:""},letter=_.templateSettings.escape.toString().substring(2,3);if(letter=="{"){defaultSetting.lineTmpl='<li><input class="sel" type="{%= type %}" name="dataSelect" id="{%= code %}" /><a href="javascript:void(0)" class="{%= hasNext ? "link" : "disabled" %}" title="{%= name %}" id="{%= code %}">{%= name %}<span class="iconfont arrow">&#xe601;</span></a></li>';defaultSetting.queueItemTmpl='<li><span class="pin">&gt;</span><a href="javascript:void(0)" gradeId="{%= code %}">{%= name %}</a></li>';defaultSetting.selLineTmpl='<li><a class="iconfont cancelLink" href="javascript:void(0)" clId="{%= code %}">&#xe600;</a>{%= name %}</li>';defaultSetting.tabLineTmpl='<li><a class="countTab" href="javascript:void(0)" tag="{%= tag %}">{%= text %}</a></li>';defaultSetting.popContent='<h5 class="headTitle">{%= popTitle %}</h5><div id="container" class="contentContainer"><div class="resultArea"><p><a class="clearSelected" href="javascript:void(0)" id="clearSelected">清空已选</a>已选择 <span id="selNum">x</span> / <span id="totalNum">x</span> 个：</p><ul class="dataSelectList" id="data-select-list"></ul></div><div class="leftPad">{% if (tabs.length > 1){ %}<ul class="tabCount" id="tabCount">{% _.each(tabs, function(tab){ %}<li><a class="countTab" href="javascript:void(0)" tag="{%= tab.Code %}">{%= tab.Title %}</a></li>{% }); %}</ul>{% } %}<ul class="selectQueue" id="selectQueue"><li><a href="javascript:void(0)" gradeId="">全部</a></li></ul><div class="dataList">{% if (showSelectAll == true) { %}<input type="checkbox" class="selectAll" id="selectAll" />全部{% } %}<ul id="data-list"></ul></div></div><div class="buttonsArea"><a href="javascript:void(0)" class="bas_btn_save" id="getAllValues">确定</a><a href="javascript:void(0)" class="bas_btn_canc" id="cancelSelect">取消</a></div></div>';defaultSetting.emptyContent='<div class="commonWrap" id="commonWrap"><h5 class="headTitle">{%= popTitle %}</h5><div id="container" class="contentContainer" style="height:300px;">数据加载中...<div class="buttonsArea"><a href="javascript:void(0)" class="bas_btn_save" id="getAllValues">确定</a><a href="javascript:void(0)" class="bas_btn_canc" id="cancelSelect">取消</a></div></div></div>'}else{defaultSetting.lineTmpl='<li><input class="sel" type="<%= type %>" name="dataSelect" id="<%= code %>" /><a href="javascript:void(0)" class="<%= hasNext ? "link" : "disabled" %>" title="<%= name %>" id="<%= code %>"><%= name %><span class="iconfont arrow">&#xe601;</span></a></li>';defaultSetting.queueItemTmpl='<li><span class="pin">&gt;</span><a href="javascript:void(0)" gradeId="<%= code %>"><%= name %></a></li>';defaultSetting.selLineTmpl='<li><a class="iconfont cancelLink" href="javascript:void(0)" clId="<%= code %>">&#xe600;</a><%= name %></li>';defaultSetting.popContent='<h5 class="headTitle"><%= popTitle %></h5><div id="container" class="contentContainer"><div class="resultArea"><p><a class="clearSelected" href="javascript:void(0)" id="clearSelected">清空已选</a>已选择 <span id="selNum">x</span> / <span id="totalNum">x</span> 个：</p><ul class="dataSelectList" id="data-select-list"></ul></div><div class="leftPad"><% if (tabs.length > 1){ %><ul class="tabCount" id="tabCount"><% _.each(tabs, function(tab){ %><li><a class="countTab" href="javascript:void(0)" tag="<%= tab.Code %>"><%= tab.Title %></a></li><% }); %></ul><% } %><ul class="selectQueue" id="selectQueue"><li><a href="javascript:void(0)" gradeId="">全部</a></li></ul><div class="dataList"><% if (showSelectAll == true) { %><input type="checkbox" class="selectAll" id="selectAll" />全部<% } %><ul id="data-list"></ul></div></div><div class="buttonsArea"><a href="javascript:void(0)" class="bas_btn_save" id="getAllValues">确定</a><a href="javascript:void(0)" class="bas_btn_canc" id="cancelSelect">取消</a></div></div>';defaultSetting.emptyContent='<div class="commonWrap" id="commonWrap"><h5 class="headTitle"><%= popTitle %></h5><div id="container" class="contentContainer" style="height:300px;">数据加载中...<div class="buttonsArea"><a href="javascript:void(0)" class="bas_btn_save" id="getAllValues">确定</a><a href="javascript:void(0)" class="bas_btn_canc" id="cancelSelect">取消</a></div></div></div>'}$.extend(defaultSetting,settings);this.initialize=function(){var self=this;defaultSetting.type=defaultSetting.maxSelected==1?"radio":"checkbox";this.holderHtml="数据加载中...";this.tempSelIds=[];this.unbind().click(function(){self.showSelWindow()})};this.bindActions=function(){this.pophtml.delegate(defaultSetting.searchButton,"click",_.bind(this.search,this));this.pophtml.delegate(defaultSetting.searchInput,"keyup",_.bind(function(e){e.keyCode==13&&this.search()},this));this.pophtml.delegate(defaultSetting.tabCount+" .countTab","click",_.bind(this.tabChange,this));this.pophtml.delegate(defaultSetting.resetButton,"click",_.bind(this.reset,this));this.pophtml.delegate(defaultSetting.clearLink,"click",_.bind(this.clearSelect,this));this.pophtml.delegate("#selectAll","click",_.bind(this.selectRecentAll,this));this.pophtml.delegate(defaultSetting.queueHolder+" a","click",_.bind(function(e){this.goQueue(e)},this));this.pophtml.delegate(defaultSetting.holder+" input","click",_.bind(function(e){this.singleToggle(e)},this));this.pophtml.delegate(defaultSetting.holder+" li a","click",_.bind(function(e){this.goNextGrade(e)},this));this.pophtml.delegate(defaultSetting.cancelLink,"click",_.bind(function(e){this.delSingleSelect(e)},this));this.pophtml.delegate(defaultSetting.getAllValues,"click",_.bind(this.getAllValues,this));this.pophtml.delegate(defaultSetting.cancelSelect,"click",_.bind(this.closePopUp,this))};this.syncSelIds=function(){var self=this,selIds=this.tempSelIds.sort(function(a,b){return a-b});_.each(selIds,function(id){var parentArray=self.findParentById(id),checkArray=self.delItemInArray(self.tempSelIds,id);_.each(checkArray,function(chk){if(_.contains(parentArray,chk)){self.tempSelIds=self.delItemInArray(self.tempSelIds,id);selIds=self.tempSelIds}})});$(global.document).find(defaultSetting.holder).find("input").prop("checked",false).attr("disabled",false);$(global.document).find("#selectAll").attr("disabled",false);_.each(selIds,function(id){var tar=$(global.document).find(defaultSetting.holder).find("#"+id);tar.prop("checked",true)});var selectedInfo=this.findSelInfo(selIds),selHTML="";_.each(selectedInfo,function(indu){selHTML+=_.template(defaultSetting.selLineTmpl)({code:indu[0],name:indu[1][defaultSetting.languageIndex]})});var ipt=$(global.document).find(defaultSetting.holder).find("input.sel"),isSelectAll=true;_.each(ipt,function(ip){if($(ip).prop("checked")==false)isSelectAll=false});if(ipt.length==0)isSelectAll=false;$(global.document).find("#selectAll").prop("checked",isSelectAll);$(global.document).find(defaultSetting.holder).html().length==0&&$(global.document).find(defaultSetting.holder).html("暂无记录");$(global.document).find(defaultSetting.selNum).html(selIds.length);$(global.document).find(defaultSetting.selHolder).html(selHTML)};this.findSelInfo=function(selIds){var selData=[];_.each(indData,function(ind){_.contains(selIds,ind[0])&&selData.push(ind)});return selData};this.showSelWindow=function(){this.pophtml=$(defaultSetting.maskDiv+_.template(defaultSetting.emptyContent)({popTitle:defaultSetting.popTitle}));this.bindActions();$(global.document).find("body").append(this.pophtml);this.getStructuredData()};this.showMainContent=function(){var self=this,indHTML="";_.each(indData,function(indu){if(indu[2]==""&&indu[4]==defaultSetting.showTag)indHTML+=_.template(defaultSetting.lineTmpl)({code:indu[0],name:indu[1][defaultSetting.languageIndex],hasNext:indu[3],type:defaultSetting.type})});this.holderHtml=indHTML;$(global.document).find(defaultSetting.commonWrap).html(_.template(defaultSetting.popContent)({popTitle:defaultSetting.popTitle,showSelectAll:defaultSetting.maxSelected>1?true:false,tabs:defaultSetting.tabs}));var tempSel=[];if($(this).next("input[type=hidden]").val().length>0&&$(this).next("input[type=hidden]").val()!="-32767"){var inputVal=$(this).next("input[type=hidden]").val().split(",");if(inputVal.length>defaultSetting.maxSelected)window.console&&console.log&&console.log("初始化选中数据失败，配置最多允许选择 "+defaultSetting.maxSelected+" 项，但初始数据有 "+inputVal.length+" 项，请检查是否有错误数据或最近有调整过配置。");else _.each(inputVal,function(ipt){tempSel.push(ipt)})}this.tempSelIds=tempSel;defaultSetting.tabs.length>1&&$(global.document).find(defaultSetting.tabCount).find("a[tag="+defaultSetting.showTag+"]").addClass("selected");$(global.document).find(defaultSetting.holder).html(this.holderHtml);$(global.document).find(defaultSetting.totalNum).html(defaultSetting.maxSelected);this.syncSelIds()};this.search=function(){var searchStr=this.valueTrimBr($(global.document).find(defaultSetting.searchInput).val()),indHTML="";_.each(indData,function(indu){if(indu.value.toString().indexOf(searchStr)>-1)indHTML+=_.template(defaultSetting.lineTmpl)({code:indu[0],name:indu[1][defaultSetting.languageIndex],hasNext:indu[3],type:defaultSetting.type})});$(global.document).find(defaultSetting.holder).html(indHTML.length>0?indHTML:'<span class="noRecord">没有匹配的项</span>');this.syncSelIds()};this.reset=function(){$(global.document).find(defaultSetting.searchInput).val("");this.search()};this.clearSelect=function(){this.tempSelIds=[];this.syncSelIds()};this.singleToggle=function(e){var id=$(e.currentTarget).attr("id"),chk=$(e.currentTarget).prop("checked");if(defaultSetting.maxSelected==1)this.tempSelIds=[id];else if(chk==true){this.tempSelIds.push(id);this.syncSelIds();if(this.tempSelIds.length>defaultSetting.maxSelected){this.tempSelIds.pop();this.syncSelIds();this.alertMaxSelectedError()}}else this.tempSelIds=this.delItemInArray(this.tempSelIds,id);this.syncSelIds()};this.goNextGrade=function(e){if($(e.currentTarget).hasClass("disabled"))return;else{var gradeId=$(e.currentTarget).prop("id"),gradeName=$(e.currentTarget).prop("title");indHTML="",queueItem=_.template(defaultSetting.queueItemTmpl)({code:gradeId,name:gradeName});$(global.document).find(defaultSetting.queueHolder).append(queueItem);_.each(indData,function(indu){if(indu[2]==gradeId)indHTML+=_.template(defaultSetting.lineTmpl)({code:indu[0],name:indu[1][defaultSetting.languageIndex],hasNext:indu[3],type:defaultSetting.type})});$(global.document).find(defaultSetting.holder).html(indHTML);this.syncSelIds();this.syncParentsSelected(gradeId)}};this.goQueue=function(e){var gradeId=$(e.currentTarget).attr("gradeId"),queueIndex=$(e.currentTarget).parent("li").index(),queueFull=$(global.document).find(defaultSetting.queueHolder).children("li"),indHTML="";if(queueFull.length==queueIndex+1)return;else _.each(queueFull,function(tar){$(tar).index()>queueIndex&&$(tar).remove()});_.each(indData,function(indu){if(indu[2]==gradeId&&indu[4]==defaultSetting.showTag)indHTML+=_.template(defaultSetting.lineTmpl)({code:indu[0],name:indu[1][defaultSetting.languageIndex],hasNext:indu[3],type:defaultSetting.type})});$(global.document).find(defaultSetting.holder).html(indHTML);this.syncSelIds();this.syncParentsSelected(gradeId)};this.selectRecentAll=function(e){var self=this,isChk=$(e.currentTarget).prop("checked"),ipt=$(global.document).find(defaultSetting.holder).find("input.sel");if(isChk&&ipt.length>defaultSetting.maxSelected){$(e.currentTarget).prop("checked",false);this.alertMaxSelectedError()}else{var oldSelIds=this.tempSelIds.concat();if(isChk==true)_.each(ipt,function(ip){self.tempSelIds.push($(ip).attr("id"))});else _.each(ipt,function(ip){self.tempSelIds=self.delItemInArray(self.tempSelIds,$(ip).attr("id"))});this.syncSelIds();if(this.tempSelIds.length>defaultSetting.maxSelected){$(e.currentTarget).prop("checked",false);this.tempSelIds=oldSelIds;this.syncSelIds();this.alertMaxSelectedError()}}};this.syncParentsSelected=function(id){if(defaultSetting.type=="radio")return;var self=this,parentsArray=this.findParentById(id),isSelect=false;_.each(parentsArray,function(te){if(_.contains(self.tempSelIds,te))isSelect=true});if(isSelect==true){var ipt=$(global.document).find(defaultSetting.holder).find("input.sel");ipt.prop("checked",true).attr("disabled",true);$(global.document).find("#selectAll").prop("checked",true).attr("disabled",true)}};this.findParentById=function(tid){var self=this,parentsArray=[];function recursionFindById(id){if(id=="")return;else _.each(indData,function(ind){if(ind[0]==id){parentsArray.push(ind[2]);recursionFindById(ind[2])}})}parentsArray.push(tid);recursionFindById(tid);return parentsArray};this.delSingleSelect=function(e){var id=$(e.currentTarget).attr("clid");this.tempSelIds=this.delItemInArray(this.tempSelIds,id);this.syncSelIds()};this.tabChange=function(e){var tag=$(e.currentTarget).attr("tag"),queueFull=$(global.document).find(defaultSetting.queueHolder).children("li"),indHTML="";defaultSetting.showTag=tag;$(e.currentTarget).addClass("selected").parents("li").siblings().find("a.countTab").removeClass("selected");_.each(queueFull,function(tar){$(tar).index()>0&&$(tar).remove()});_.each(indData,function(indu){if(indu[2]==""&&indu[4]==tag)indHTML+=_.template(defaultSetting.lineTmpl)({code:indu[0],name:indu[1][defaultSetting.languageIndex],hasNext:indu[3],type:defaultSetting.type})});$(global.document).find(defaultSetting.holder).html(indHTML);this.syncSelIds()};this.getAllValues=function(){var self=this,hasSelectedIds=this.tempSelIds,selectedInfo=this.findSelInfo(hasSelectedIds),selValues=[];_.each(selectedInfo,function(indu){selValues.push(indu[1][defaultSetting.languageIndex])});$(this).val(selValues.join(", "));$(this).next("input[type=hidden]").val(hasSelectedIds.join(","));this.closePopUp()};this.closePopUp=function(){this.pophtml.remove()};this.valueTrimBr=function(str){return str.replace(/(^\s*)|(\s*$)/g,"").replace(/(^[\s\u3000]*)|([\s\u3000]*$)/g,"").replace(/\n/g," ")};this.delItemInArray=function(array,item){var idx=_.indexOf(array,item);return idx<0?void 0:array.slice(0,idx).concat(array.slice(idx+1,array.length))};this.getStructuredData=function(){var self=this,tenantId=global.BSGlobal?global.BSGlobal.TenantId:"-",rootURL=this.structuredDataConfig.root?this.structuredDataConfig.root:$bs_vars&&$bs_vars.constSite?$bs_vars.constSite:"//const.italent.cn",settingsURL=rootURL+"/api/setting/"+tenantId,preURL=rootURL+"/resource",showLang=this.structuredDataConfig.language||"chs";function getJSONPData(url,callback,success){$.ajax({url:url,dataType:"jsonp",jsonpCallback:callback,cache:true,success:success})}function analysisCodeData(){var tabsConfig=[],tempIndData=[];_.each(window.structuredData[self.structuredDataConfig.type],function(type){tempIndData=tempIndData.concat(_.map(type.data,function(data){return[data[0],data[1],data[2],data[3],type.tab.Code]}));tabsConfig.push(type.tab)});indData=tempIndData;defaultSetting.tabs=tabsConfig;defaultSetting.showTag=defaultSetting.tabs?defaultSetting.tabs[0].Code:"structuredData";self.showMainContent()}function getContentData(){if(typeof window.structuredData[self.structuredDataConfig.type]=="undefined")window.structuredData[self.structuredDataConfig.type]={};getJSONPData(settingsURL,"talentData_settingsCallback",function(settings){settings.tenantId=tenantId;settings.showLang=showLang;window.structuredData.settings=settings;var getTenantId=settings.IsCustom==true?tenantId:1e5;getJSONPData(preURL+"/"+self.structuredDataConfig.type+"-"+showLang+"-"+settings.Version+"-"+getTenantId+".js","Const"+self.structuredDataConfig.type,function(structuredData){window.structuredData[self.structuredDataConfig.type]=new Array({tab:{Title:"结构数据",Code:"structuredData"},data:structuredData});analysisCodeData()})})}if(tenantId=="-"){window.console&&console.log&&console.log("获取租户ID失败！");return}if(typeof window.structuredData=="undefined")window.structuredData={};else if(typeof window.structuredData[self.structuredDataConfig.type]!="undefined"&&window.structuredData.settings.showLang==showLang&&window.structuredData.settings.tenantId==tenantId){analysisCodeData();return}getContentData()};this.alertMaxSelectedError=function(){alert("最多只能选择"+defaultSetting.maxSelected+"项")};this.structuredDataConfig={root:defaultSetting.root,type:defaultSetting.type||"type",language:defaultSetting.language};this.initialize()}})}(jQuery,window.top)