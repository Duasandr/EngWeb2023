import json

# Load the dataset
data = json.load(open('./datasets/dataset-extra1.json'))

x = 0
for person in data['pessoas']:
    # Add id field to each person
    person['id'] = f"p{x}"
    x += 1

# Another way to do it
#for index, person in enumerate(data['pessoas']):
#    person['id'] = "p" + str(index)

# Open backup file to save the updated dataset
backupFile = open('./datasets/dataset-extra1-backup.json', 'w', encoding='utf-8')

# Save the new dataset to a backup file
# The ensure_ascii=False parameter is used to save the file in UTF-8
json.dump(data, backupFile, ensure_ascii=False, indent=4)

backupFile.close()
