from nltk.stem import PorterStemmer
import requests
from bs4 import BeautifulSoup
from collections import defaultdict
import re

# Function to extract text from a webpage
def get_page_text(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        return soup.get_text()
    except Exception as e:
       # print("Error:", e)
        return ""

# Function to extract links from a webpage
def get_links(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        links = [link.get('href') for link in soup.find_all('a', href=True)]
       # print("######################## links")
       # print(links)
        return links
    except Exception as e:
        print("Error:", e)
        return []

def remove_stop_words(text):
  stop_words = {'a', 'an', 'the', 'and', 'is', 'are', 'or', 'in', 'on', 'at','skip','-'}
  words = [word for word in text if word.lower() not in stop_words]
  #print("#################### no stop words")
  #print(words)
  return words



def apply_stemming(words):
    stemmer = PorterStemmer()
    stemmed_words = [stemmer.stem(word) for word in words]
    #print("######################## stemming")
    #print(stemmed_words)
    return stemmed_words

# Function to create index database
def create_index(url):
    index = defaultdict(list)
    visited = set()
    queue = [url]
    loop = 0
    while queue and loop < 50:
        loop+=1
        current_url = queue.pop(0)
        if current_url in visited:
            continue

        visited.add(current_url)
        text = get_page_text(current_url)
        words = remove_stop_words(text.split())
        words = apply_stemming(words)

        for word in words:
            index[word].append(current_url)

        links = get_links(current_url)
        for link in links:
            if link.startswith(url) and link not in visited:
                queue.append(link)
    # print(index)
    return index



# should be global
link_ids = {}

def update_dict(word, link):
    global link_ids
    if link not in link_ids:
        link_ids[link] = len(link_ids) + 1
    link_id = link_ids[link]
    if link not in index[word]:
        index[word][link] = {'id': link_id, 'counter': 0}
    index[word][link]['counter'] += 1

website_url = 'https://www.redhat.com/en'
index_db = create_index(website_url)
index = defaultdict(dict)

for word, links in index_db.items():
    for link in links:
        update_dict(word, link)



def test(index):
    sorted_dict = {}
    counter_for_each_word = 0
    for word, links in index.items():
        for link in links.keys():
            counter_for_each_word += index[word][link]['counter']
        sorted_dict[word] = counter_for_each_word
        counter_for_each_word = 0
        #print(sorted_dict[word])
    return sorted_dict


# print(len(index))

print(test(index))
