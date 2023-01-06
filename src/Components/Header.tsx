import styled from "styled-components";
import {motion, useAnimation, useScroll} from "framer-motion";
import {useState, useEffect} from "react";
import {Link, useRouteMatch, useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";

//100퍼센트 모든 것을 flex로 통제하기 보다는 적당히 margin도 써주네.
const Nav = styled(motion.nav)`
	width: 100%;
	height: 80px;
	font-size: 12px;
	background-color:black;
	color: white;
	
	display: flex;
	align-items: center;
	justify-content: space-between;
	z-index: 10;
	position: fixed;
	top:0;
`;

const Col = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	
	margin-right: 50px;
`;

const Logo = styled(motion.svg)`
	margin-left: 50px;
	margin-right:50px;
	width:90px;
	height:80px;
	
	cursor: pointer;
`;

const Items = styled.ul`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Item = styled.li`
	margin-right:20px;
	
	cursor: pointer;
	
	position: relative;
`;

const Circle = styled(motion.div)`
	width:10px;
	height:10px;
	border-radius: 50px;
	background-color: red;
	
	position: absolute;
	top: 15px;
	right: 10px;
`;

const Search = styled(motion.form)`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const SearchLogo = styled(motion.svg)`
	width:30px;
	height:30px;
`;

const SearchInput = styled(motion.input)`
	width:180px;
	height:40px;
	
	font-size: 20px;
	
	transform-origin: right center;
	
	background-color: rgba(0,0,0,0.1);
	color: white;
	border-top: solid;
	border-right: solid;
	border-left: solid;
	border-bottom: solid;
	outline: none;
`;
interface IForm{
	keyword: string;
}
function Header(){
	const history = useHistory();
	const {scrollY} = useScroll();
	const inputAnimation = useAnimation();
	const navAnimation = useAnimation();
	const homeMatch = useRouteMatch("/");
	const tvMatch = useRouteMatch("/tv");
	const [searchOpen, setSearchOpen] = useState(true);
	const toggleSearch=()=>{
		if(searchOpen){
			inputAnimation.start({scaleX: 0});
		}else{
			inputAnimation.start({scaleX: 1});
		}
		setSearchOpen((prev)=> !prev); //비동기라서 이걸 앞부분에 배치한다고 해도 먼저 true로 바꿀 수가 없다.
	}
	useEffect(()=>{
		scrollY.onChange((latest)=>{
			if(latest >80){
				navAnimation.start({background:"rgba(0,0,0,1)"});	
			}else{
				navAnimation.start({background:"rgba(0,0,0,0)"});
			}
		})
	},[])
	const {register, handleSubmit} = useForm<IForm>();
	const onValid = (data: IForm) => {
		history.push(`/search?keyword=${data.keyword}`);
	}
	return (
		<Nav initial={{background:"rgba(0,0,0,0)"}} animate={navAnimation}>
			<Col>
				<Link  to="/">
					<Logo xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 276.742">
						<Link  to="/">
							<motion.path
								 whileHover="active" d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"
							fill="#d81f26"/>
						</Link>
					</Logo>
				</Link>
				<Items>
					<Item>
						<Link to="/">
							Movies{homeMatch?.isExact && <Circle  layoutId="circle" style={{position: "absolute", top:"20px", right:"10px"}}/>}
						</Link>
					</Item>
					<Item>
						<Link to="/tv">
							Tv Shows{tvMatch?.isExact && <Circle layoutId="circle" style={{position: "absolute", top:"20px", right:"18px"}}/>}
						</Link>
					</Item>
				</Items>
			</Col>
			<Col>
				<Search onSubmit={handleSubmit(onValid)}>
					<SearchInput
						{...register("keyword", {required:true, minLength:2})}
						animate={inputAnimation}
						placeholder="Search for movie or tv"
						transition={{type: "linear"}}
					/>
					<SearchLogo onClick={toggleSearch} animate={{x: searchOpen ? -215 :0}} transition={{type: "linear"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
							<motion.path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z">
							</motion.path>
					</SearchLogo>
				</Search>
			</Col>
		</Nav>
	)
}

export default Header;