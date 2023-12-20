// THIS IS SAMPLE CODE ONLY - NOT MEANT FOR PRODUCTION USE
import { BlobServiceClient } from '@azure/storage-blob';

// saas Token 
// const sasToken = "sv=2021-12-02&ss=bfqt&srt=sco&sp=rwlacupitf&se=2023-05-10T17:38:04Z&st=2023-04-20T09:38:04Z&spr=https,http&sig=AY%2BOLVF04AqzmJIZtGMF7qGhSGSl1zUexrQBwKFglkQ%3D"; // Fill string with your SAS token
const sasToken = "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-03-08T18:22:09Z&st=2023-10-05T10:22:09Z&sip=123.201.36.180&spr=https,http&sig=pGRpla3Rg79NKNhTBWNI8JlmEJ%2BUG7xD61jflyFumVw%3D"
// container name
const containerName = `truesquarefeet`;
// storage account name
const storageAccountName = "pixonixstorage"; // Fill string with your Storage resource name

// Feature flag - disable storage feature to app if not configured
export const isStorageConfigured = () => {
    return !((!storageAccountName || !sasToken));
};

// return list of blobs in container to display
const getBlobsInContainer = async (containerClient) => {
    const returnedBlobUrls = [];

    // get list of blobs in container
    // eslint-disable-next-line
    for await (const blob of containerClient.listBlobsFlat()) {
        // if image is public, just construct URL
        returnedBlobUrls.push(
            `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`
        );
    }

    return returnedBlobUrls;
};


const createBlobInContainer = async (containerClient, file) => {

    try {  // create blobClient for container
        const blobClient = containerClient.getBlockBlobClient(file.name);

        // set mimetype as determined from browser with file upload control
        const options = { blobHTTPHeaders: { blobContentType: file.type } };

        // upload file
        await blobClient.uploadBrowserData(file, options);
    }
    catch (error) {
        console.log(error);
    }

};

const uploadFileToBlob = async (file) => {
    if (!file) return [];

    // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
    const blobService = new BlobServiceClient(
        `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    );
    // get Container - full public read access
    const containerClient = blobService.getContainerClient(containerName);

    // upload file
    await createBlobInContainer(containerClient, file);

    // get list of blobs in container
    return getBlobsInContainer(containerClient);
};
// </snippet_uploadFileToBlob>

export const deleteBlob = async (blobName) => {

    const blobService = new BlobServiceClient(
        `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    );
    // get Container - full public read access
    const containerClient = blobService.getContainerClient(containerName);

    // containerClient.uploadBlockBlob("/abc")
    containerClient.deleteBlob(`${blobName}`)

}

// priview
export const handlePriview = (fileName) => {
    return `https://${storageAccountName}.blob.core.windows.net/${containerName}/${fileName}`;
};

// retrive file name
export const getFileName = (url) => {
    if (url == "") {
        return url
    }
    if (url == null) {
        return url
    }
    if (url == undefined) {
        return url
    }
    return url?.substring(url.lastIndexOf('/') + 1)
}

export default uploadFileToBlob;

