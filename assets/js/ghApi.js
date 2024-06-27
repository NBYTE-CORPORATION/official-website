const owner = 'enxec';
const repo = 'ByteFactory';

async function fetchLatestReleaseAssets() {
    const apiURL = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;
    
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        
        // 릴리스 자산 목록을 반환
        return data.assets;
    } catch (error) {
        console.error("Error fetching latest release assets:", error);
        return [];
    }
}

async function displayLatestExeDownloadLink() {
    const assets = await fetchLatestReleaseAssets();
    
    // .exe 확장자를 가진 자산만 필터링
    const exeAssets = assets.filter(asset => asset.name.endsWith('.exe'));
    
    // 필터링된 .exe 자산이 있는 경우
    if (exeAssets.length > 0) {
        // `<a>` 태그를 id를 통해 찾음
        const downloadLinkElement = document.getElementById('downloadLink');
        
        // 찾은 첫 번째 .exe 파일의 다운로드 링크를 `<a>` 태그의 `href` 속성에 삽입
        downloadLinkElement.href = exeAssets[0].browser_download_url;
    } else {
        console.log("No .exe files found in the latest release.");
    }
}

displayLatestExeDownloadLink();