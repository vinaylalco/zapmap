For latest updates repository has been moved to https://bitbucket.org/vinaylal/arc-mapstr/src/master/

# zapmap
A map application which allows you to create NOSTR notes as map locations. Built on REACT Native Web and Expo and interacts with various API's like NOSTR, Open Street Maps etc.

Demo Site at https://mapstr.xyz

# Install:
Clone repository into a local or development server using GIT eg git clone https://github.com/vinaylalco/zapmap.git

# Run:

Local
'expo start' in project root to run project locally. NB: Its based on Expo so you'll need an Expo environment set up locally to do this. Select 'Web' and Expo will pop up a browser to view the site.

On Server

Use 'expo build:web' in project root folder to create a build version of the project. Website files will then be available in 'web-build' folder. You can then upload these via FTP or SSH as you wish to your domain of choice.

# How to Use the ZapMap:

Out of the box ZapMap will allow you to do several things:

1. You can view locations within 105km that accept Bitcoin as payment according to the OpenStreet Maps API. Currently around 7000 locations worldwide. This data is similar to that shown by btc.org/map as they pull from the same data source.
2. View map of locations already created by mapstr.xyz (you can change this in the code if you like to pull from other notes you want to create yourself and map). See 'mapstrpublickey' variable in App.js and change as appropriate.
3. Create Lightning Invoices for those creators who have made location content. Hit the 'Zap' button to create an invoice for the specific user who created that piece of content.
4. You can login with your NOSTR keys via Extension or Private key as you desire. You can also create a new account.
5. You can manage your Relays. A standard set is used out of the box but you can edit them.
6. You can create new locations. Which will be posted to the map. You may have to reload the page to see them as the results are cached to avoid 'flickering' of results from Relays as they update.

# Authors:
Find me on NOSTR by searching with my nPub: npub10e50y57lutmex7jqmam2cl46ukvkd3sx0lrsxuk54t5etzftwseq6wyd5x

# How to Contribute to the Project:
Feel free to form and use this code for your own NOSTR mapping projects.
