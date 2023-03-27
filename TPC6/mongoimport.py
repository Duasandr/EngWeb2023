import json
import sys
import requests

url = "http://localhost:7777/people/insert"


def main():
    if len(sys.argv) != 4:
        print("Usage: python3 mongoimport.py <db> <collection> <dataset.json>")
        sys.exit(1)
    
    filename = sys.argv[3]

    with open(filename) as file:
        data = json.load(file)

        for person in data["pessoas"]:
            requests.post(url, json=person)


if __name__ == "__main__":
    main()
