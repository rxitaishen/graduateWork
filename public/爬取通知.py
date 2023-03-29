import requests

url = 'https://jwc.zufe.edu.cn/search.jsp?wbtreeid=1001'

Ecommerce = '55S15a2Q5ZWG5Yqh56ue6LWb'
Competition  = '56ue6LWb'

Eformdata = {
    'lucenenewssearchkey': Ecommerce,
    '_lucenesearchtype': '1',
    'searchScope': '1',
    'x': '0',
    'y': '0'
}

Cformdata = {
    'lucenenewssearchkey': Competition,
    '_lucenesearchtype': '1',
    'searchScope': '1',
    'x': '0',
    'y': '0'
}

Eresponse = requests.post(url, data=Eformdata)
Cresponse = requests.post(url, data=Cformdata)

# 目前还是bytes编码后的结果，转换为utf-8，成为了html
Etext = Eresponse.content
Edecoded_text = Etext.decode('utf-8')

Ctext = Cresponse.content
Cdecoded_text = Ctext.decode('utf-8')


#print(Edecoded_text)

# 打开文件，如该文件不存在则会创建它
#file = open("./output.txt", "w", encoding='utf-8')

# 将字符串写入文件
#file.write(Edecoded_text)

# 关闭文件
#file.close()

#==============================#

from bs4 import BeautifulSoup

# 解析HTML内容
Esoup = BeautifulSoup(Edecoded_text, 'html.parser')
Csoup = BeautifulSoup(Cdecoded_text, 'html.parser')

# 遍历HTML内容，并获取链接以及标题
for link in Esoup.find_all('a', style='text-decoration:none'):
    href = link.get('href')
    res_tag = link.text.strip()
    res_link = 'https://jwc.zufe.edu.cn/' + href
    print(f" {res_tag} {res_link}")
    
print()

for link in Csoup.find_all('a', style='text-decoration:none'):
    href = link.get('href')
    res_tag = link.text.strip()
    res_link = 'https://jwc.zufe.edu.cn/' + href
    print(f" {res_tag}  {res_link}")
