import React from 'react'
// import {Svg} from 'expo';
import * as Svg from 'react-native-svg';

/*
import Svg, {
	Path,
	// Mask,
	G,
	Ellipse,
	Defs,
	LinearGradient,
	Stop,
} from 'react-native-svg';
*/

/* SVGR has dropped some elements not supported by react-native-svg: filter */

const MarathonFinishSvg = props => (
	<Svg width={214} height={225} fill="none" viewBox="0 0 214 225" {...props}>
		<Svg.Path
			d="M75.431 141L31 44.008c4.5-18.151 54.742-9.832 79.301-3.404L138 96.758C125.064 110.37 86.117 123.606 75.431 141z"
			fill="#E8E8E8"
		/>
		<Svg.Path
			d="M172.949 156.474c51.1-49.386-8.395-92.639-27.809-103.787-19.415-11.148-42.242-37.091-103.788 27.81s10.637 94.308 27.81 103.787c17.174 9.479 52.688 21.576 103.787-27.81z"
			fill="url(#prefix__paint0_linear)"
		/>
		<Svg.Path
			d="M172.949 156.474c51.1-49.386-8.395-92.639-27.809-103.787-19.415-11.148-42.242-37.091-103.788 27.81s10.637 94.308 27.81 103.787c17.174 9.479 52.688 21.576 103.787-27.81z"
			fill="url(#prefix__paint1_linear)"
		/>
		{/*<Mask*/}
			{/*id="prefix__a"*/}
			{/*maskUnits="userSpaceOnUse"*/}
			{/*x={0}*/}
			{/*y={12}*/}
			{/*width={214}*/}
			{/*height={213}*/}
		{/*>*/}
			{/*<Path*/}
				{/*d="M172.949 156.474c51.1-49.386-8.395-92.639-27.809-103.787-19.415-11.148-42.242-37.091-103.788 27.81s10.637 94.308 27.81 103.787c17.174 9.479 52.688 21.576 103.787-27.81z"*/}
				{/*fill="url(#prefix__paint2_linear)"*/}
			{/*/>*/}
			{/*<Path*/}
				{/*d="M172.949 156.474c51.1-49.386-8.395-92.639-27.809-103.787-19.415-11.148-42.242-37.091-103.788 27.81s10.637 94.308 27.81 103.787c17.174 9.479 52.688 21.576 103.787-27.81z"*/}
				{/*fill="url(#prefix__paint3_linear)"*/}
			{/*/>*/}
		{/*</Mask>*/}
		<Svg.G mask="url(#prefix__a)">
			<Svg.Path
				d="M75.431 141L31 44.008c4.5-18.151 54.742-9.832 79.301-3.404L138 96.758C125.064 110.37 86.117 123.606 75.431 141z"
				fill="#C17373"
			/>
			<Svg.Path
				d="M87.688 125.289c-41.12-1.299-45.99 40.398-39.497 70.336h18.396v39.496h71.418L135.3 192.92h25.429c1.082-37.333 7.034-73.042-73.041-67.631z"
				fill="url(#prefix__paint4_linear)"
			/>
			<Svg.Path
				d="M88.229 128.535l6.492-22.183c22.075-59.299 34.086-27.593 37.332-4.328l-16.501 43.554c-12.986 9.955-21.913-11.091-27.323-17.043z"
				fill="url(#prefix__paint5_linear)"
			/>
			<Svg.G filter="url(#prefix__filter0_d)">
				<Svg.Path
					d="M95.345 93.388c3.132-11.69 15.148-18.627 26.837-15.495 11.69 3.133 18.627 15.148 15.494 26.838-3.132 11.689-18.531 28.641-30.22 25.508-11.69-3.132-15.243-25.162-12.111-36.851z"
					fill="url(#prefix__paint6_linear)"
				/>
			</Svg.G>
			<Svg.Path
				d="M112.035 89.58c-4.734-2.976-15.375 14.157-17.72 19.207 0-20.019 3.112-34.357 26.918-43.013 23.806-8.657 22.994 18.125 22.994 18.125s38.36 5.68-4.058 25.699c-9.022 4.258-19.065-14.317-28.134-20.018z"
				fill="#0E2034"
			/>
			<Svg.Path fill="#C4C4C4" d="M33.846 27.828h66.53v27.395h-66.53z" />
			<Svg.Path
				fill="url(#prefix__paint7_linear)"
				d="M33.846 27.828h66.53v27.395h-66.53z"
			/>
			<Svg.Path
				d="M12.12 31.574c0-13.062 10.588-23.65 23.65-23.65h46.073v47.3H35.77c-13.061 0-23.65-10.59-23.65-23.65z"
				fill="#C4C4C4"
			/>
			<Svg.Path
				d="M12.12 31.574c0-13.062 10.588-23.65 23.65-23.65h46.073v47.3H35.77c-13.061 0-23.65-10.59-23.65-23.65z"
				fill="url(#prefix__paint8_linear)"
			/>
			<Svg.Ellipse
				cx={63.216}
				cy={27.678}
				rx={29.37}
				ry={27.545}
				fill="url(#prefix__paint9_linear)"
			/>
			<Svg.Ellipse cx={99.25} cy={37.806} rx={18.571} ry={17.417} fill="#C4C4C4" />
			<Svg.Ellipse
				cx={99.25}
				cy={37.806}
				rx={18.571}
				ry={17.417}
				fill="url(#prefix__paint10_linear)"
			/>
		</Svg.G>
		<Svg.Path fill="#C4C4C4" d="M61.392 27.828h38.984v27.395H61.392z" />
		<Svg.Path
			fill="url(#prefix__paint11_linear)"
			d="M61.392 27.828h38.984v27.395H61.392z"
		/>
		<Svg.Path
			d="M18.612 31.574c0-13.062 10.589-23.65 23.65-23.65h38.416v47.3H42.263c-13.061 0-23.65-10.59-23.65-23.65z"
			fill="#C4C4C4"
		/>
		<Svg.Path
			d="M18.612 31.574c0-13.062 10.589-23.65 23.65-23.65h38.416v47.3H42.263c-13.061 0-23.65-10.59-23.65-23.65z"
			fill="url(#prefix__paint12_linear)"
		/>
		<Svg.Ellipse
			cx={63.216}
			cy={27.678}
			rx={29.37}
			ry={27.545}
			fill="url(#prefix__paint13_linear)"
		/>
		<Svg.Ellipse cx={99.25} cy={37.806} rx={18.571} ry={17.417} fill="#C4C4C4" />
		<Svg.Ellipse
			cx={99.25}
			cy={37.806}
			rx={18.571}
			ry={17.417}
			fill="url(#prefix__paint14_linear)"
		/>
		<Svg.Defs>
			<Svg.LinearGradient
				id="prefix__paint0_linear"
				x1={68.258}
				y1={184.28}
				x2={159.427}
				y2={26.369}
				gradientUnits="userSpaceOnUse"
			>
				<Svg.Stop stopColor="#531C7B" />
				<Svg.Stop offset={1} stopColor="#8B67A5" />
			</Svg.LinearGradient>
			<Svg.LinearGradient
				id="prefix__paint1_linear"
				x1={101.564}
				y1={176.757}
				x2={166.396}
				y2={64.465}
				gradientUnits="userSpaceOnUse"
			>
				<Stop stopColor="#A81B67" />
				<Stop offset={1} stopColor="#EE9258" />
			</Svg.LinearGradient>
			<Svg.LinearGradient
				id="prefix__paint2_linear"
				x1={68.258}
				y1={184.28}
				x2={159.427}
				y2={26.369}
				gradientUnits="userSpaceOnUse"
			>
				<Svg.Stop stopColor="#531C7B" />
				<Svg.Stop offset={1} stopColor="#8B67A5" />
			</Svg.LinearGradient>
			<Svg.LinearGradient
				id="prefix__paint3_linear"
				x1={101.564}
				y1={176.757}
				x2={166.396}
				y2={64.465}
				gradientUnits="userSpaceOnUse"
			>
				<Svg.Stop stopColor="#A81B67" />
				<Svg.Stop offset={1} stopColor="#EE9258" />
			</Svg.LinearGradient>
			<Svg.LinearGradient
				id="prefix__paint4_linear"
				x1={96.56}
				y1={166.949}
				x2={77.082}
				y2={343.331}
				gradientUnits="userSpaceOnUse"
			>
				<Svg.Stop stopColor="#fff" />
				<Svg.Stop offset={1} stopColor="#531C7B" />
			</Svg.LinearGradient>
			<Svg.LinearGradient
				id="prefix__paint5_linear"
				x1={105.758}
				y1={137.057}
				x2={126}
				y2={92}
				gradientUnits="userSpaceOnUse"
			>
				<Svg.Stop stopColor="#CD7E62" />
				<Svg.Stop offset={0.991} stopColor="#CD7E62" />
			</Svg.LinearGradient>
			<Svg.LinearGradient
				id="prefix__paint6_linear"
				x1={122.315}
				y1={136.086}
				x2={40.075}
				y2={57.117}
				gradientUnits="userSpaceOnUse"
			>
				<Svg.Stop stopColor="#CD7E62" />
				<Svg.Stop offset={1} stopColor="#FFAE91" />
			</Svg.LinearGradient>
			<Svg.LinearGradient
				id="prefix__paint7_linear"
				x1={69.963}
				y1={50.176}
				x2={27.818}
				y2={-50.729}
				gradientUnits="userSpaceOnUse"
			>
				<Svg.Stop stopColor="#531C7B" />
				<Svg.Stop offset={1} stopColor="#EAEAEA" stopOpacity={0} />
			</Svg.LinearGradient>
			<Svg.LinearGradient
				id="prefix__paint8_linear"
				x1={46.981}
				y1={42.509}
				x2={-117.436}
				y2={91.013}
				gradientUnits="userSpaceOnUse"
			>
				<Svg.Stop stopColor="#531C7B" />
				<Svg.Stop offset={1} stopColor="#EAEAEA" stopOpacity={0} />
			</Svg.LinearGradient>
			<Svg.LinearGradient
				id="prefix__paint9_linear"
				x1={58.083}
				y1={55.223}
				x2={-158.958}
				y2={-53.939}
				gradientUnits="userSpaceOnUse"
			>
				<Svg.Stop stopColor="#531C7B" />
				<Svg.Stop offset={1} stopColor="#EAEAEA" />
			</Svg.LinearGradient>
			<Svg.LinearGradient
				id="prefix__paint10_linear"
				x1={100.841}
				y1={48.806}
				x2={169.299}
				y2={0.187}
				gradientUnits="userSpaceOnUse"
			>
				<Svg.Stop stopColor="#531C7B" />
				<Svg.Stop offset={1} stopColor="#EAEAEA" />
			</Svg.LinearGradient>
			<Svg.LinearGradient
				id="prefix__paint11_linear"
				x1={82.555}
				y1={50.176}
				x2={26.543}
				y2={-28.407}
				gradientUnits="userSpaceOnUse"
			>
				<Svg.Stop stopColor="#531C7B" />
				<Svg.Stop offset={1} stopColor="#EAEAEA" stopOpacity={0} />
			</Svg.LinearGradient>
			<Svg.LinearGradient
				id="prefix__paint12_linear"
				x1={49.645}
				y1={42.509}
				x2={-99.188}
				y2={81.594}
				gradientUnits="userSpaceOnUse"
			>
				<Svg.Stop stopColor="#531C7B" />
				<Svg.Stop offset={1} stopColor="#EAEAEA" stopOpacity={0} />
			</Svg.LinearGradient>
			<Svg.LinearGradient
				id="prefix__paint13_linear"
				x1={58.083}
				y1={55.223}
				x2={-158.958}
				y2={-53.939}
				gradientUnits="userSpaceOnUse"
			>
				<Svg.Stop stopColor="#531C7B" />
				<Svg.Stop offset={1} stopColor="#EAEAEA" />
			</Svg.LinearGradient>
			<Svg.LinearGradient
				id="prefix__paint14_linear"
				x1={100.842}
				y1={48.806}
				x2={169.299}
				y2={0.187}
				gradientUnits="userSpaceOnUse"
			>
				<Svg.Stop stopColor="#531C7B" />
				<Svg.Stop offset={1} stopColor="#EAEAEA" />
			</Svg.LinearGradient>
		</Svg.Defs>
	</Svg>
)

export default MarathonFinishSvg
