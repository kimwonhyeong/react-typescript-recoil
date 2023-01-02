import {useLocation} from "react-router";
import {IGetbestGrade, IBestGradeResult, search} from "../api";
import {useQuery} from "react-query";
import styled from "styled-components";
import {motion, AnimatePresence} from "framer-motion";
import {makeImagePath} from "../utils";

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
`;

const ContentWrapper = styled.div`
	width: 95%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	gap:20px;
`;

const Content = styled.div<{bgPhoto:string}>`
	width: 300px;
	height: 450px;
	background-image: url(${({bgPhoto})=>bgPhoto});
	background-size: cover;
`;

function Search() {
	const location = useLocation();
	console.log(location);
	const keyword = new URLSearchParams(location.search).get("keyword");
	const {data, isLoading} = useQuery<IGetbestGrade>(["searchD",keyword], ()=>search(keyword+""));
	return (
		<Wrapper>
			<h1 style={{marginTop: "50px", transform:"translate(0, -40%)", fontSize:"30px", fontWeight:"300"}}>검색 영화</h1>
			<hr style={{width:"90%", float:"right"}}></hr>
			<ContentWrapper>
				{data?.results.map((item)=>
					<Content bgPhoto={makeImagePath(item.poster_path)}></Content>
				)}
			</ContentWrapper>
		</Wrapper>
	);
}

export default Search;