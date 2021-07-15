export default {
    getPhotos: (state) => (eid) => {
        const pics = []
        for (let i = 1; i < state.imagesCounter; i++) {
            const url = `https://firebasestorage.googleapis.com/v0/b/osher-project.appspot.com/o/users%2F${window.user.uid}%2Fevents%2F${eid}%2F${i}?alt=media&token=44987d98-aee0-49e5-8a38-fe5255ddac7d`

            const image = {url, isDownload: false}
            pics.push(image)
        }
        return pics
    }

}