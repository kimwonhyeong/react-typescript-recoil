import styled from "styled-components";
import {useRecoilValue} from "recoil";
import {videoKey} from "../atom";
import {BackSvg} from "../Components/DetailView";
import {useHistory} from "react-router-dom";

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
	z-index: 3;
`;

function PlayMedia(){
	const history = useHistory();
	const videoKeys = useRecoilValue(videoKey);
	const backClick = ()=>{
		history.go(-1);
	};
	console.log(videoKeys);
	return (
		<Wrapper>
			<BackSvg onClick={backClick} xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 384 512">
				<path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
			</BackSvg>
			{videoKeys.length>0 ?
				<>
				<Iframe
				src={`https://www.youtube.com/embed/${videoKeys}/?autoplay=1&controls=0&rel=1&showinfo=0&autohide=1`}
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