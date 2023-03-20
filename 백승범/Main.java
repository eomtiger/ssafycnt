import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.io.BufferedReader;
import java.io.IOException;

public class Main {

    public static String getTagValue(String tag, Element eElement) {

        //결과를 저장할 result 변수 선언
        String result = "";

        NodeList nlList = eElement.getElementsByTagName(tag).item(0).getChildNodes();

        result = nlList.item(0).getTextContent();

        return result;
    }

    // tag값의 정보를 가져오는 함수
    public static String getTagValue(String tag, String childTag, Element eElement) {

        //결과를 저장할 result 변수 선언
        String result = "";

        NodeList nlList = eElement.getElementsByTagName(tag).item(0).getChildNodes();

        for(int i = 0; i < eElement.getElementsByTagName(childTag).getLength(); i++) {

            //result += nlList.item(i).getFirstChild().getTextContent() + " ";
            result += nlList.item(i).getChildNodes().item(0).getTextContent() + " ";
        }

        return result;
    }

    public static void main(String[] args) throws IOException, ParserConfigurationException, SAXException {
        for(int a=2013;a<=2023;a++) {
            for(int b=1;b<=12;b++) {
                String month = Integer.toString(b);
                StringBuilder yearMonth = new StringBuilder();
                if(month.length()==2) {
                    yearMonth.append(Integer.toString(a)+month);
                } else {
                    yearMonth.append(Integer.toString(a)+"0"+month);
                }
                String year =
                StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/1220000/nitemtrade/getNitemtradeList"); /*URL*/
                urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=5d2n6cE8hZM5hQWy7dBeiYN0V5K3yAMe8j4hROS8Cj60eNd8PPPDcYzh8PeDcT8iyNYEOGIjdlSXL8Wkyrj9Wg%3D%3D"); /*Service Key*/
                urlBuilder.append("&" + URLEncoder.encode("strtYymm","UTF-8") + "=" + URLEncoder.encode("201601", "UTF-8")); /*조회기간 1년이내*/
                urlBuilder.append("&" + URLEncoder.encode("endYymm","UTF-8") + "=" + URLEncoder.encode("201607", "UTF-8")); /*조회기간 1년이내*/
                urlBuilder.append("&" + URLEncoder.encode("hsSgn","UTF-8") + "=" + URLEncoder.encode("1001999090", "UTF-8")); /*품목코드 참조*/
                urlBuilder.append("&" + URLEncoder.encode("cntyCd","UTF-8") + "=" + URLEncoder.encode("US", "UTF-8")); /*국가코드 참조*/
                URL url = new URL(urlBuilder.toString());
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("GET");
                conn.setRequestProperty("Content-type", "application/json");

                DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
                DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
                Document doc = (Document) dBuilder.parse(new InputSource(conn.getInputStream()));
                doc.getDocumentElement().normalize();

                StringBuilder sb = new StringBuilder();

                Node items = doc.getElementsByTagName("items").item(0);
                NodeList item = items.getChildNodes();
                for(int i=1;i< item.getLength();i++) {
                    Node nNode = item.item(i);
                    Element eElement = (Element) nNode;

                    sb.append(getTagValue("year",eElement)+",");
                    sb.append(getTagValue("statCdCntnKor1",eElement)+",");
                    sb.append(getTagValue("statCd",eElement)+",");
                    sb.append(getTagValue("statKor",eElement)+",");
                    sb.append(getTagValue("hsCd",eElement)+",");
                    sb.append(getTagValue("expWgt",eElement)+",");
                    sb.append(getTagValue("expDlr",eElement)+",");
                    sb.append(getTagValue("impWgt",eElement)+",");
                    sb.append(getTagValue("impDlr",eElement)+",");
                    sb.append(getTagValue("balPayments",eElement));
                    System.out.println(sb);
                    sb.setLength(0);
                }
            }
            }
        }
}
