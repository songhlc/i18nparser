import Parser from 'tree-sitter';
import JAVA from 'tree-sitter-java'
var input = `
package com.yonyou.cpu.web.portal.controller.goods;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.yonyou.cpu.base.BaseController;
import com.yonyou.cpu.domain.entity.account.MgrUser;
import com.yonyou.cpu.domain.entity.enterprise.EnterprisePOJO;
import com.yonyou.cpu.excel.convertor.GoodsImport;
import com.yonyou.cpu.excel.convertor.ImageUploadUtils;
import com.yonyou.cpu.excel.model.GoodsIO;
import com.yonyou.iuap.iweb.exception.WebRuntimeException;
import com.yonyou.yuncai.cpu.domain.standardgoods.Goods;
import com.yonyou.yuncai.cpu.domain.standardgoods.GoodsClassPlat;
import com.yonyou.yuncai.cpu.domain.standardgoods.GoodsDetail;
import com.yonyou.yuncai.cpu.standardgoods.service.IGoodsClassPlatService;
import com.yonyou.yuncai.cpu.standardgoods.service.IGoodsPlatService;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import uap.web.basic.auth.utils.PropertyUtil;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/goods")
public class GoodsRestController extends BaseController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private IGoodsPlatService iGoodsPlatService;

    @Autowired
    private IGoodsClassPlatService iGoodsClassPlatService;

    /**
     * 物料导入功能
     */
    @RequestMapping(value = "/importGoods", method = RequestMethod.POST)
    public String importGoods(HttpServletRequest request) throws IOException {
        logger.info("Excel 导入标准产品，开始。");
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            //1. 导入前校验
            logger.info("1. 导入前校验");
            if (!(request instanceof MultipartHttpServletRequest)) {
                throw new RuntimeException("没有上传文件！");
            }
            MultipartFile[] f = ((MultipartHttpServletRequest) request).getFileMap().values().toArray(new MultipartFile[0]);
            MultipartFile file = f == null || f.length == 0 ? null : f[0];
            if (file == null) {
                throw new RuntimeException("没有上传文件！");
            }
            MgrUser currentUser = super.getCurrentUserData();
            if (currentUser == null) {
                throw new WebRuntimeException("查询当前登录人信息失败!");
            }
            EnterprisePOJO curenterprise = super.getCurrentEnterprise();
            if (curenterprise == null) {
                throw new WebRuntimeException("查询当前登录企业信息失败!");
            }
            GoodsImport mcimp = new GoodsImport(GoodsIO.class);
            List<GoodsIO> GoodsIOList = mcimp.doImport("物料导入",file);
            if(GoodsIOList == null || GoodsIOList.size() < 1){
                throw new RuntimeException("请按照模板导入，并且导入数据不能为空，请确认！");
            }
            if(GoodsIOList.size() < 1000){
                logger.info("pureq:{}", JSONObject.toJSONString(GoodsIOList));
            }
            //验证分类名称
//            Set<String> materialClassCodes = new HashSet<>();
//            for(GoodsIO materialIO : materialeq){
//                if(materialIO == null || Strings.isNullOrEmpty(materialIO.getCode()) &&
//                        Strings.isNullOrEmpty(materialIO.getName()) &&
//                        Strings.isNullOrEmpty(materialIO.getClassCode()) &&
//                        Strings.isNullOrEmpty(materialIO.getMeasdoc())){
//                    continue;
//                }
//                if(StringUtils.isBlank(materialIO.getClassCode())){
//                    throw new RuntimeException("所属物料分类编码不能为空！");
//                }
//                materialClassCodes.add(materialIO.getClassCode());
//            }
            //2. 组装采购需求实体
            logger.info("2. 组装物料实体");
            Map<Goods,GoodsDetail> goodsGoodsDetailMap=new HashMap<Goods,GoodsDetail>();
            List<String> industryClassNameList=new ArrayList<>();
            List<String> msgList=new ArrayList<>();
            List<String> failNameList=new ArrayList<>();
            /**
             * 只保留产品标题、产品名称、计量单位、类型、产地、注册证号、产品分类、生产企业名称、注册人名称
             */
            List<String> repeatNameAndProductorNameList=new ArrayList<>();
            for (GoodsIO goodsIO : GoodsIOList) {
                if (StringUtils.isBlank(goodsIO.getTitle())
                        ||StringUtils.isBlank(goodsIO.getName())
                        ||StringUtils.isBlank(goodsIO.getMeas())
                        ||StringUtils.isBlank(goodsIO.getType())
                        ||StringUtils.isBlank(goodsIO.getIsDomestic())
                        ||StringUtils.isBlank(goodsIO.getRegistrationNumber())
                        ||StringUtils.isBlank(goodsIO.getIndustryClassName())
                        ||StringUtils.isBlank(goodsIO.getProductorName())
                        ||StringUtils.isBlank(goodsIO.getRegUserName())){
                    failNameList.add(goodsIO.getName());
                    StringBuffer titleName=new StringBuffer();
                    if (StringUtils.isBlank(goodsIO.getTitle())){
                        titleName.append(" 标题");
                    }
                    if (StringUtils.isBlank(goodsIO.getName())){
                        titleName.append(" 名称");
                    }
                    if (StringUtils.isBlank(goodsIO.getMeas())){
                        titleName.append(" 计量单位");
                    }
                    if (StringUtils.isBlank(goodsIO.getType())){
                        titleName.append(" 类型");
                    }
                    if (StringUtils.isBlank(goodsIO.getIsDomestic())){
                        titleName.append(" 产地");
                    }
                    if (StringUtils.isBlank(goodsIO.getRegistrationNumber())){
                        titleName.append(" 注册账号");
                    }
                    if (StringUtils.isBlank(goodsIO.getIndustryClassName())){
                        titleName.append(" 产品分类");
                    }
                    if (StringUtils.isBlank(goodsIO.getProductorName())){
                        titleName.append(" 生产企业名称");
                    }
                    if (StringUtils.isBlank(goodsIO.getRegUserName())){
                        titleName.append(" 注册人名称");
                    }
                    msgList.add(goodsIO.getName()+"非空条件不满足（"+titleName.toString()+"）");
                    continue;
                }
                Goods goods=new Goods();
                goods.setTitle(goodsIO.getTitle());
                goods.setName(goodsIO.getName().trim());
                goods.setCode(goodsIO.getCode());
                goods.setBrand(goodsIO.getBrand());
                goods.setIndustry_tags("2");
                goods.setEnterprise_id(curenterprise.getId());
                goods.setEnterprise_name(curenterprise.getName());
                goods.setCreator(currentUser.getName());
                goods.setCreate_user_code(currentUser.getEcCode());
                goods.setCreate_user_id(Long.valueOf(currentUser.getId()));
                goods.setStatus(1);
                goods.setField1(goodsIO.getImg());

                GoodsDetail goodsDetail=new GoodsDetail();
                goodsDetail.setName_en(goodsIO.getNameEn());
                goodsDetail.setMeasdoc(goodsIO.getMeas());
                goodsDetail.setSpec(goodsIO.getSpec());
                goodsDetail.setModal(goodsIO.getModel());
                int majorClass=0;
                switch (goodsIO.getType()){
                    case "器械":majorClass=1;break;
                    case "药品":majorClass=2;break;
                }
                if (majorClass==0){
                    //产品类型不符
                    failNameList.add(goodsIO.getName());
                    msgList.add(goodsIO.getName()+"产品类型不符");
                    continue;
                }
                goodsDetail.setMajor_class(majorClass);
                int isDomestic=-1;
                switch (goodsIO.getIsDomestic()){
                    case "国产":isDomestic=1;break;
                    case "进口":isDomestic=0;break;
                }
                if (isDomestic==-1){
                    //是否国产不符
                    failNameList.add(goodsIO.getName());
                    msgList.add(goodsIO.getName()+"是否国产不符");
                    continue;
                }
                goodsDetail.setIs_domestic(isDomestic);
                goodsDetail.setRegistration_number(goodsIO.getRegistrationNumber());
                goodsDetail.setIndustry_class_name(goodsIO.getIndustryClassName());
                industryClassNameList.add(goodsIO.getIndustryClassName());
                //
                goodsDetail.setTreatment_class(goodsIO.getTreatmentClass());
                goodsDetail.setProxy_user_name(goodsIO.getProxyUserName());
                goodsDetail.setProductor_address(goodsIO.getProductorAddress());
                goodsDetail.setStorage_condition(goodsIO.getStorageCondition());
                goodsDetail.setValid_term(goodsIO.getValidTerm());
                goodsDetail.setMateria_composition(goodsIO.getMateriaComposition());
                goodsDetail.setProductor_name(goodsIO.getProductorName().trim());
                goodsDetail.setProductor_name_en(goodsIO.getProductorNameEn());
                goodsDetail.setProduct_country(goodsIO.getProductCountry());
                goodsDetail.setReg_user_name(goodsIO.getRegUserName());
                try {
                    goodsDetail.setApproved_date(DateUtils.parseDate(goodsIO.getApprovedDate(), "yyyy/MM/dd").getTime());
                } catch (Exception e){
                    //日期格式不符
                    failNameList.add(goodsIO.getName());
                    msgList.add(goodsIO.getName()+"日期格式不符");
                    continue;
                }
                List<String> checkGoodsDetail=checkGoodsDetail(goods,goodsDetail);
                if (checkGoodsDetail.size()>0){
                    msgList.addAll(checkGoodsDetail);
                    failNameList.add(goodsIO.getName());
                    continue;
                }
                if (repeatNameAndProductorNameList.contains(goods.getName()+":"+goodsDetail.getProductor_name())) {
                    msgList.add(goodsIO.getName()+"和表格内数据重复");
                    failNameList.add(goodsIO.getName());
                    continue;
                }
                repeatNameAndProductorNameList.add(goods.getName() + ":" + goodsDetail.getProductor_name());
                goodsGoodsDetailMap.put(goods,goodsDetail);
            }
            int num=0;
            if (goodsGoodsDetailMap.size()>0){
                // 根据名称检查产品分类及匹配分类ID ,物料项目增加根据分类名称list查询id的方法
                List<GoodsClassPlat> goodsClassPlatList = iGoodsClassPlatService.getGoodsClassPlatListByNameList(industryClassNameList,2);
                Map<String,GoodsClassPlat> stringGoodsClassPlatMap=new LinkedHashMap<>();
                for (GoodsClassPlat goodsClassPlat:goodsClassPlatList){
                    stringGoodsClassPlatMap.put(goodsClassPlat.getClassName(),goodsClassPlat);
                }
                if(goodsGoodsDetailMap.size() > 0) {
                    List<Goods> removeGoodsList=new ArrayList<>();
                    for (Goods goods : goodsGoodsDetailMap.keySet()) {
                        GoodsDetail goodsDetail = goodsGoodsDetailMap.get(goods);
                        if (!stringGoodsClassPlatMap.containsKey(goodsDetail.getIndustry_class_name())) {
                            //产品分类不匹配
                            removeGoodsList.add(goods);
                            failNameList.add(goods.getName());
                            msgList.add(goods.getName() + "产品分类不匹配");
                            continue;
                        }
                        goodsDetail.setIndustry_class_id(stringGoodsClassPlatMap.get(goodsDetail.getIndustry_class_name()).getId());
                    }
                    for (Goods goods:removeGoodsList){
                        goodsGoodsDetailMap.remove(goods);
                    }
                }

                if (goodsGoodsDetailMap.size()>0) {
                    //判重
                    List<GoodsDetail> repeatList = iGoodsPlatService.checkGoodsExistList(goodsGoodsDetailMap);
                    List<String> repeatStrList = new ArrayList<>();
                    for (GoodsDetail goodsDetail : repeatList) {
                        repeatStrList.add(goodsDetail.getCommon_name() + "," + goodsDetail.getProductor_name());
                    }
                    if (CollectionUtils.isNotEmpty(repeatStrList)) {
                        List<Goods> removeGoodsList = new ArrayList<>();
                        for (Goods goods : goodsGoodsDetailMap.keySet()) {
                            GoodsDetail goodsDetail = goodsGoodsDetailMap.get(goods);
                            if (repeatStrList.contains(goods.getName() + "," + goodsDetail.getProductor_name())) {
                                removeGoodsList.add(goods);
                                failNameList.add(goods.getName() + "（" + goodsDetail.getProductor_name() + "）");
                                msgList.add(goods.getName() + "（" + goodsDetail.getProductor_name() + "）" + "重复");
                                continue;
                            }
                        }
                        for (Goods goods : removeGoodsList) {
                            goodsGoodsDetailMap.remove(goods);
                        }
                    }
                }

                //3. 批量保存物料分类信息
                if(goodsGoodsDetailMap.size() > 0){
                    JSONArray jsonArray = iGoodsPlatService.batchSaveGoods(goodsGoodsDetailMap);
                    num=jsonArray.size();
                    if (num>0) {
                        String fileuploadurl = PropertyUtil
                                .getPropertyByKey("fileupload.fileurl.service");
                        // 图片附件存储
                        for (int i = 0; i < num;i++) {
                            JSONObject jsonObject=jsonArray.getJSONObject(i);
                            Goods goods= (Goods) jsonObject.get("goods");
                            if (goods.getField1()!=null){
                                String ids=goods.getField1();
                                for (String id:ids.split("\\|")) {
                                    ImageUploadUtils.updateAttached(fileuploadurl, id, "imgdisplay" + goods.getId(), "imgdisplay");
                                }
                            }
                        }
                    }
                }
            }
            String msg;
            if (failNameList.size()==0){
                msg=num+"条数据全部导入成功";
            } else {
                StringBuffer msgTmp = new StringBuffer("导入成功" + num + "条，失败" + failNameList.size() + "条。失败数据:");
                for (String name : failNameList) {
                    msgTmp.append("产品[" + name + "],");
                }
                msgTmp.append("请确认数据的准确性后，将失败部分的数据修正后重新导入（").append(msgList).append("）");
                msg = msgTmp.toString().replace("null"," ");
            }
            result.put("result", num != 0?"success":"fail");
            result.put("msg",msg);
            result.put("detailErrMsg",msgList);
            logger.info("标准产品信息导入成功");
        } catch (Exception e) {
            e.printStackTrace();
            result.put("status", "fail");
            result.put("msg", e.getMessage());
            logger.error("云端处理失败!", e);
        }
        String returnResult = JSONObject.toJSONString(result);
        logger.debug("导入结束返回结果：{}", returnResult);
        logger.info("Excel 导入标准产品，结束。");
        return returnResult;
    }

    private void checkBlankAndLength(String item,String itemName,int length,List<String> checkList, boolean checkBlank){

        if (checkBlank){
            if (org.apache.commons.lang.StringUtils.isBlank(item)){
                checkList.add(itemName+"不能为空");
            } else if (item.length()>length){
                checkList.add(itemName+"不能超过"+length+"个字");
            }
        } else {
            if (org.apache.commons.lang.StringUtils.isNotBlank(item) && item.length()>length){
                checkList.add(itemName+"不能超过"+length+"个字");
            }
        }

    }

    private List<String> checkGoodsDetail(Goods goods,GoodsDetail goodsDetail){
        List<String> checkList=new ArrayList<>();
        //产品标题、产品名称、计量单位、类型、产地、注册证号、产品分类、生产企业名称、注册人名称 必输
        //Goods
        //*产品标题 title 50
        checkBlankAndLength(goods.getTitle(),"产品标题",50,checkList,true);
        //*产品名称 name 50
        checkBlankAndLength(goods.getName(),"产品名称",50,checkList,true);
        //*计量单位 measdoc 20
        checkBlankAndLength(goodsDetail.getMeasdoc(),"计量单位",20,checkList,true);
        //产品编码 code 50
        checkBlankAndLength(goods.getCode(),"产品编码",50,checkList,false);
        //产品品牌 brand 100
        checkBlankAndLength(goods.getBrand(),"产品品牌",100,checkList,false);

        //GoodsDetail
        //*类型 major_class 1
        if(goodsDetail.getMajor_class() == null) {
            checkList.add("产品类型不能为空");
        }
        //*产地 is_domestic 1
        if(goodsDetail.getIs_domestic() == null) {
            checkList.add("产地不能为空");
        }
        //*注册证号  registration_number 50
        checkBlankAndLength(goodsDetail.getRegistration_number(), "注册证号", 50, checkList, true);
        //通用名 common_name 100
        checkBlankAndLength(goodsDetail.getCommon_name(), "通用名", 100, checkList, false);
        //*注册人名称 reg_user_name 100
        checkBlankAndLength(goodsDetail.getReg_user_name(), "注册人名称", 100, checkList, true);
        //代理人名称 proxy_user_name 100
        checkBlankAndLength(goodsDetail.getProxy_user_name(), "代理人名称", 100, checkList, false);
        //*产品分类 industry_class_id
//        if(goodsDetail.getIndustry_class_id() == null) {
//            checkList.add("产品分类不能为空");
//        }
        //生产国家或地区 product_country 100
        checkBlankAndLength(goodsDetail.getProduct_country(), "生产国家或地区", 100, checkList, false);
        //*生产企业名称 productor_name 200
        checkBlankAndLength(goodsDetail.getProductor_name(), "生产企业名称", 200, checkList, true);
        //生产地址 productor_address 200
        checkBlankAndLength(goodsDetail.getProductor_address(), "生产地址", 100, checkList, false);
        //产品储存条件 storage_condition 50
        checkBlankAndLength(goodsDetail.getStorage_condition(), "产品储存条件", 100, checkList, false);
        //有效期 valid_term 20
        checkBlankAndLength(goodsDetail.getValid_term(), "有效期", 20, checkList, false);
        //规格 spec 200
        checkBlankAndLength(goodsDetail.getSpec(), "规格", 200, checkList, false);
        //型号 modal 200
        checkBlankAndLength(goodsDetail.getModal(), "型号", 200, checkList, false);
        //临床诊疗分类 treatment_class 100
        checkBlankAndLength(goodsDetail.getTreatment_class(), "临床诊断分类", 100, checkList, false);
        //批准日期 approved_date
        //材料成分 materia_composition 200
        checkBlankAndLength(goodsDetail.getMateria_composition(), "材料成分", 200, checkList, false);
        //备注 descr 200
        checkBlankAndLength(goodsDetail.getDescr(), "备注", 200, checkList, false);

        //进口
        if(goodsDetail.getIs_domestic() == 0) {
            //*产品名称(英文) name_en 100
            checkBlankAndLength(goodsDetail.getName_en(), "产品英文名称", 100, checkList, true);
            //生产企业名称(英文) productor_name_en 200
            checkBlankAndLength(goodsDetail.getProductor_name_en(), "生产企业英文名称", 200, checkList, false);
            //生产地址(英文) productor_address_en 200
            checkBlankAndLength(goodsDetail.getProductor_address_en(), "英文生产地址", 200, checkList, false);
        }

        //药品
        //分包装批准文号 package_number 50
        checkBlankAndLength(goodsDetail.getPackage_number(), "分包装批准文号", 50, checkList, false);
        //药品本位码 drug_standard_code 20
        checkBlankAndLength(goodsDetail.getDrug_standard_code(), "药品本位码", 20, checkList, false);
        //发证日期  issue_date
        //禁忌症 contraindication 200
        checkBlankAndLength(goodsDetail.getContraindication(), "禁忌症", 200, checkList, false);
        //不良反应 adverse_reaction 200
        checkBlankAndLength(goodsDetail.getAdverse_reaction(), "不良反应", 200, checkList, false);
        //主要成分 main_components 200
        checkBlankAndLength(goodsDetail.getMain_components(), "主要成分", 200, checkList, false);
        //适应症 indication 200
        checkBlankAndLength(goodsDetail.getIndication(), "适应症", 200, checkList, false);
        return checkList;
    }

}
`
const parser = new Parser();
parser.setLanguage(JAVA);
const tree = parser.parse(input);
debugger