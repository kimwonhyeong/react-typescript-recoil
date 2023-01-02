import styled from "styled-components";
import {useRecoilValue} from "recoil";
import {videoKey} from "../atom";

const Wrapper = styled.div`
	width: 100%;
	height: 100vh;
	z-index: 1;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Iframe = styled.iframe`
	width: 100%;
	height: 100%;
	position: relative;
	z-index: 30;
`;

const HideUsage = styled.div`
	width: 100%;
	height: 80px;
	position: absolute;
	top: 0;
	z-index:50;
	background: black;
`;

function PlayMedia(){
	const videoKeys = useRecoilValue(videoKey);
	console.log(videoKeys);
	return (
		<Wrapper>
			{videoKeys.length>0 ?
				<>
				<HideUsage></HideUsage>
				<Iframe
				src={`https://www.youtube.com/embed/${videoKeys}/?autoplay=1&controls=1&rel=1&showinfo=0&autohide=1`}
				title="YouTube video player"
				frameBorder="0"
				scrolling="no"
				allow="fullscreen;
					   autoplay; 
					   loop;
					   clipboard-write; 
					   encrypted-media; 
					   gyroscope;"
				></Iframe>
				</>
				: <p>영상 데이터 부족으로 인하여 재생이 제한됩니다.</p>
			}
		</Wrapper>
	);
}

export default PlayMedia;

// {check ? 
		// 	<Iframe
		// 		src={`https://www.youtube.com/embed/${key}/?autoplay=0&controls=0&rel=0&showinfo=0`}
		// 		title="YouTube video player"
		// 		frameBorder="0"
		// 		scrolling="no"
		// 		allow="fullscreen; accelerometer; autoplay; loop; clipboard-write; encrypted-media; gyroscope;">
		// 	</Iframe>
		//  : null}