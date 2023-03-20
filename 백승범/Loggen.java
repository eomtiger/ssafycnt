import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Loggen {

    static List<String> cntyCds = Arrays.asList(
            "AD","AE","AF","AG","AI","AL","AM","AN","AO","AQ","AR","AS","AT","AU","AW",
            "AX","AZ","BA","BB","BD","BE","BF","BG","BH","BI","BJ","BL","BM","BN","BO",
            "BQ","BR","BS","BT","BV","BW","BY","BZ","CA","CC","CD","CF","CG","CH","CI",
            "CK","CL","CM","CN","CO","CR","CU","CV","CW","CX","CY","CZ","DE","DJ","DK",
            "DM","DO","DZ","EC","EE","EG","EH","ER","ES","ET","FI","FJ","FK","FM","FO",
            "FR","GA","GB","GD","GE","GF","GG","GH","GI","GL","GM","GN","GP","GQ","GR",
            "GS","GT","GU","GW","GY","HK","HM","HN","HR","HT","HU","HW","ID","IE","IL",
            "IM","IN","IO","IQ","IR","IS","IT","JE","JM","JO","JP","KE","KG","KH","KI",
            "KM","KN","KP","KR","KV","KW","KY","KZ","LA","LB","LC","LI","LK","LR","LS",
            "LT","LU","LV","LY","MA","MC","MD","ME","MF","MG","MH","MK","ML","MM","MN",
            "MO","MP","MQ","MR","MS","MT","MU","MV","MW","MX","MY","MZ","NA","NC","NE",
            "NF","NG","NI","NL","NO","NP","NR","NT","NU","NZ","OM","PA","PE","PF","PG",
            "PH","PK","PL","PM","PN","PR","PS","PT","PW","PY","QA","RE","RO","RS","RU",
            "RW","SA","SB","SC","SD","SE","SG","SH","SI","SJ","SK","SL","SM","SN","SO",
            "SR","SS","ST","SV","SX","SY","SZ","TC","TD","TF","TG","TH","TJ","TK","TL",
            "TM","TN","TO","TR","TT","TV","TW","TZ","UA","UG","UM","US","UY","UZ","VA",
            "VC","VE","VG","VI","VN","VU","WF","WS","YE","YT","YU","ZA","ZM","ZR","ZW"
    );

    static List<String> hsSgns = Arrays.asList(
        "8542","2710","8703","8708","8524","8901","8523","8473","2841","8507","2902","8517","8486","7210",
            "3901","3907","7208","3304","8529","8534","8542","2710","8486","8703","8517","8473","8507","8708"
    );

    public static String getTagValue(String tag, Element eElement) {

        //결과를 저장할 result 변수 선언
        String result = "";

        NodeList nlList = eElement.getElementsByTagName(tag).item(0).getChildNodes();

        result = nlList.item(0).getTextContent();

        return result;
    }
    public static void main(String[] args) throws IOException, ParserConfigurationException, SAXException {
        File file = new File("c:\\bigdata\\trading.txt");
        if(!file.exists()) {
            file.createNewFile();
        }
        FileWriter fw = new FileWriter(file);
        PrintWriter writer = new PrintWriter(fw);

        for(int a=2013;a<=2023;a++) {
            for(int b=0;b<cntyCds.size();b++) {
                for(int c=0;c<hsSgns.size();c++) {
                    String start = Integer.toString(a)+"01";
                    String end = Integer.toString(a)+"12";
                    StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/1220000/nitemtrade/getNitemtradeList"); /*URL*/
                    urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=5d2n6cE8hZM5hQWy7dBeiYN0V5K3yAMe8j4hROS8Cj60eNd8PPPDcYzh8PeDcT8iyNYEOGIjdlSXL8Wkyrj9Wg%3D%3D"); /*Service Key*/
                    urlBuilder.append("&" + URLEncoder.encode("strtYymm","UTF-8") + "=" + URLEncoder.encode(start, "UTF-8")); /*조회기간 1년이내*/
                    urlBuilder.append("&" + URLEncoder.encode("endYymm","UTF-8") + "=" + URLEncoder.encode(end, "UTF-8")); /*조회기간 1년이내*/
                    urlBuilder.append("&" + URLEncoder.encode("hsSgn","UTF-8") + "=" + URLEncoder.encode(hsSgns.get(c), "UTF-8")); /*품목코드 참조*/
                    urlBuilder.append("&" + URLEncoder.encode("cntyCd","UTF-8") + "=" + URLEncoder.encode(cntyCds.get(b), "UTF-8")); /*국가코드 참조*/
                    URL url = new URL(urlBuilder.toString());
                    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                    conn.setRequestMethod("GET");
                    conn.setRequestProperty("Content-type", "application/json");

                    DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
                    DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
                    Document doc = (Document) dBuilder.parse(new InputSource(conn.getInputStream()));
                    doc.getDocumentElement().normalize();

                    StringBuilder sb = new StringBuilder();

                    NodeList items = doc.getElementsByTagName("item");
                    for(int i=1;i<items.getLength();i++) {
                        Node item = items.item(i);
                        Element eElement = (Element) item;
                        sb.append(getTagValue("year",eElement)+",");
                        sb.append(getTagValue("statCdCntnKor1",eElement)+",");
                        sb.append(getTagValue("statCd",eElement)+",");
                        sb.append(getTagValue("statKor",eElement)+",");
                        sb.append(getTagValue("hsCd",eElement)+",");
                        sb.append(getTagValue("expWgt",eElement)+",");
                        sb.append(getTagValue("expDlr",eElement)+",");
                        sb.append(getTagValue("impWgt",eElement)+",");
                        sb.append(getTagValue("impDlr",eElement)+",");
                        sb.append(getTagValue("balPayments",eElement)+"\n");
                    }
                    if(sb.length()==0) continue;
                    sb.setLength(sb.length()-1);
//                    System.out.println(sb);
                    writer.write(sb.toString());
                }
            }
        }
        writer.close();
    }
}
