import {q,f,m,type Both} from './course-fix-builders';

// Remaining slots paired with the reviewed lessons, not the legacy English prompt course.
export const MEDIA_COMPLETIONS:Record<string,Record<number,Both>>={
 '3-5':{
  2:q(['约5秒的节水镜头，哪条动作描述最容易核对？','Which action description is easiest to check in a roughly five-second water-saving shot?'],[['学生伸手转紧水龙头，随后水流停止','A student reaches to close the tap, then the water stops'],['学生跑跳转身并同时更换场景','The student runs, jumps, turns, and changes scenes simultaneously'],['用更有电影感的方式表达环保','Express sustainability in a more cinematic way']],['明确主体、动作与先后关系，比抽象风格或过载动作更可检查。','A subject, action, and sequence are more checkable than abstract style or overloaded motion.']),
  3:q(['摄影机沿视线靠近人物，让人物在画面中逐渐变大，这叫？','The camera moves toward a person along its viewing direction, making the person larger in frame. What is this?'],[['推近','Push-in'],['拉远','Pullback'],['原地横摇','Pan from a fixed position']],['移动机位靠近主体是推近；原地转动机位是摇摄，不是横向平移。','Moving the camera closer is a push-in; rotating in place is a pan, not lateral translation.']),
  4:q(['为什么初次制作短镜头时要限制动作数量？','Why limit the number of actions in an initial short-shot attempt?'],[['便于核对动作顺序并定位哪一步不连续','To check order and locate discontinuities'],['视频模型只能生成静止人物','Video models can generate only motionless people'],['动作少就能保证身份绝不变化','Fewer actions guarantee identical identity']],['简化有助检查与控制，但不能保证结果没有瑕疵。','Simplicity helps inspection and control without guaranteeing a flawless result.']),
  5:q(['同一连续动作中，学生蓝衣突然变红，但没有换衣情节。这直接说明什么？','During one continuous action, blue clothing suddenly turns red with no change-of-clothes event. What is directly shown?'],[['服装外观的时间连续性出了问题','Temporal continuity of appearance failed'],['已经证明摄影机越过动作轴','The camera is proven to have crossed the action axis'],['已经证明字幕时间轴错误','The caption timeline is proven wrong']],['外观跳变与越轴、字幕错位是不同现象，需要分别检查。','Appearance drift, axis crossing, and caption misalignment are different observations.']),
  6:q(['片段中“水先停、手后到”，而设计要求关开关后水才停。先怎样改？','The water stops before the hand arrives, but the plan requires stopping after closing the handle. What first?'],[['明确动作依赖，调整该段顺序后逐帧复查','Clarify the dependency, adjust this sequence, and inspect frames'],['只换配乐以掩盖先后问题','Change music to conceal the order'],['增加与该动作无关的转场','Add unrelated transitions']],['要修的是动作顺序，不是风格；先集中解决已观察到的问题。','The defect is action order, not style; focus on the observed problem.']),
  8:f(['衣服、道具与动作在相邻时刻衔接，体现了___。','Clothing, props, and actions connecting across adjacent moments demonstrate ___.'],[['时间连续性','temporal continuity'],['图像分辨率','image resolution'],['文字相似度','text similarity']],['连续性需要跨时间核对，单张清晰图不能证明。','Continuity requires checks across time; one sharp frame cannot establish it.']),
  9:f(['“学生抬手关水龙头”描述的是主体___，不是摄影机运动。','“The student raises a hand to close the tap” describes subject ___, not camera movement.'],[['动作','action'],['帧率','frame rate'],['宽高比','aspect ratio']],['把主体如何动与机位如何动分开，提示和检查会更清楚。','Separate subject motion from camera motion for clearer prompting and checking.']),
 12:m(['按明确的机位变化配对。','Match the explicitly described camera motions.'],[
   [['摄影机向主体靠近','Camera moves closer to the subject'],['推近','Push-in']],
   [['摄影机沿视线后退','Camera moves backward along the viewing direction'],['拉远','Pullback']],
   [['机位沿水平方向平移，朝向基本不变','Camera translates sideways, with orientation largely unchanged'],['横向移动','Lateral tracking']],
   [['机位与朝向都保持不变','Position and orientation both stay unchanged'],['固定镜头','Locked-off shot']]]),
 13:m(['把三帧计划与已指定的检查重点配对。','Match a three-frame plan to its specified checks.'],[
   [['起始：学生走近水龙头','Start: student approaches the tap'],['确认角色与场景初始位置','Establish initial character and scene positions']],
   [['中间：手触碰开关','Middle: hand touches the handle'],['确认手与开关有接触关系','Check hand-handle contact']],
   [['结束：转紧后水停止','End: water stops after closing'],['确认动作结果符合先后依赖','Check that the result follows its prerequisite']],
   [['三个时间点并排比较','Compare all three moments side by side'],['核对衣服和道具是否意外跳变','Check unintended clothing or prop changes']]]),
 15:m(['把已发现的问题与针对性改动配对。','Match observed issues to targeted revisions.'],[
   [['一个短镜头同时挤入太多动作','Too many actions are packed into one short shot'],['减少动作或拆成更短段落','Reduce actions or split into shorter segments']],
   [['镜头抖动使招牌无法阅读','Camera shake makes a sign unreadable'],['尝试固定或平稳机位并检查可读性','Try a stable camera and recheck readability']],
   [['未交代的越轴使方向反转','Unestablished axis crossing reverses direction'],['调整机位一侧或补交代镜头','Keep camera side consistent or establish the crossing']],
   [['关水动作完成前水已停止','Water stops before the closing action'],['重新安排动作和结果的时间关系','Reorder the action and its result']]]),
 },
 '3-6':{
  1:q(['为约5秒的镜头配旁白，首先应检查什么？','What should you check first for narration of a roughly five-second shot?'],[['实际试读时长与可理解性，必要时删减文字','Actual reading duration and intelligibility; shorten text if needed'],['字数越多越能保证信息完整','More words guarantee complete communication'],['只要加快播放就能适应任何长度','Speeding playback can fit any length appropriately']],['时长要实测；不能为了塞进镜头而让人听不懂。','Measure duration; fitting the shot should not destroy intelligibility.']),
  3:q(['旁白被配乐盖住，应该先怎样调整？','Music masks the narration. What should you adjust first?'],[['降低配乐或在说话时让配乐减弱，再整体回听','Lower or duck music during speech, then listen to the full mix'],['同时提高配乐和旁白音量','Raise music and narration equally'],['只把字幕加粗而不检查声音','Bold the captions without checking audio']],['混音的目的包括让重点人声听清，不是整体越响越好。','Mixing should keep important speech intelligible, not simply make everything louder.']),
  4:q(['旁白说“离开前拧紧水龙头”，哪幅画面最贴合这一信息？','Which visual best supports “turn off the tap before leaving”?'],[['同一学生转紧开关后离开，水已停止','The student closes the handle, water stops, then they leave'],['只展示新水壶的商品包装','Show only new bottle packaging'],['学生离开，水仍不断流出且无解释','Student leaves while water flows, without explanation']],['画面应帮助理解旁白，而不是无意传达相反操作。','Visuals should support the narration rather than unintentionally show the opposite action.']),
  5:q(['一条关键字幕来不及读完就消失，怎样处理？','A key caption disappears before it can be read. What should change?'],[['缩短冗余文字或增加可读时间，重新试看','Shorten repetition or extend reading time, then preview again'],['把字体进一步缩小，塞入更多内容','Shrink the font further to fit more text'],['只增加转场数量','Only add more transitions']],['可读性涉及文字量、时长和位置，不能靠更多装饰解决。','Readability depends on text length, duration, and placement, not extra decoration.']),
  7:f(['把文字转换成语音的功能叫___。','Converting text to speech is called ___.'],[['TTS','TTS'],['ASR','ASR'],['OCR','OCR']],['TTS生成声音，ASR转写声音，OCR读取图中文字。','TTS generates speech, ASR transcribes speech, and OCR reads image text.']),
  8:f(['把已有语音转写成文字的功能叫___。','Transcribing existing speech into text is called ___.'],[['ASR','ASR'],['TTS','TTS'],['inpaint','inpaint']],['转写文字仍可能有错，要和实际原音对照。','Transcripts can be wrong; compare them with the actual audio.']),
  9:f(['字幕要在对应的话语时间出现，需要检查字幕___。','Captions should appear with the corresponding speech, so check caption ___.'],[['时间轴','timing'],['来源许可','source licensing'],['文件名称','filenames']],['时间轴与文字准确性是两项检查，文字对了也可能提前或滞后。','Timing and text accuracy are separate; correct words can still appear early or late.']),
 12:m(['按明确的音频症状配对处理方法。','Match explicit audio symptoms to remedies.'],[
   [['配乐遮住旁白','Music masks narration'],['减弱配乐并回听混音','Reduce music and replay the mix']],
   [['原始录音已经削波失真','The source recording is clipped'],['降低录音增益后重录；仅调小失真文件无效','Lower recording gain and re-record; turning down a clipped file does not repair it']],
   [['句间没有喘息，难以理解','No sentence pauses makes speech hard to follow'],['调整停顿并试听语意','Adjust pauses and check comprehensibility']],
   [['不同句子响度忽大忽小','Loudness jumps between sentences'],['平衡各段人声响度后回听','Balance speech loudness and listen again']]]),
 13:m(['把字幕问题与针对性修正配对。','Match caption issues to targeted corrections.'],[
   [['整轨字幕比旁白早一秒','Entire caption track is one second early'],['整体后移一秒并检查首尾','Shift it one second later and inspect both ends']],
   [['一行过长难以阅读','A line is too long to read'],['按语意拆行或精简','Split by meaning or shorten']],
   [['字幕挡住开关动作','Captions obscure the handle action'],['调整字幕位置并核对画面','Reposition captions and check the image']],
   [['原音正确，但字幕术语写错','Audio is correct but a caption term is wrong'],['按脚本与原音修正转写','Correct the transcript against script and audio']]]),
 },
 '3-7':{
  2:q(['短片中引用“某行为每年节水多少升”，应该保留什么依据？','A film claims an action saves a number of liters per year. What evidence is needed?'],[['可追溯来源及适用条件，确认数值与情境相符','A traceable source and conditions matching the number and scenario'],['只要写“数据来自网络”','Only “data from the internet”'],['用生成次数证明多数答案一致','Generation count showing most answers agree']],['数字脱离适用范围会误导，引用也要真正支持本次表述。','A number outside its scope can mislead; the source must support the actual claim.']),
  3:q(['本课“连续画面”主要要求什么？','What does coherent visual continuity require here?'],[['人物、道具和动作在时间与空间上衔接','Characters, props, and actions connect in time and space'],['每一镜必须使用同一景别','Every shot must have identical framing'],['每一秒都要增加一种转场','Add a new transition every second']],['镜头可以变化，但变化需要可理解的联系。','Shots may differ, but transitions need understandable connections.']),
  4:q(['本课成片要求可听清的旁白与协调字幕。只有旁白文本，下一步是什么？','The final film calls for intelligible narration and coherent captions. Only narration text exists. What remains?'],[['录制或生成声音，回听并配合字幕检查','Record or generate audio, listen, and check captions against it'],['把文本文件改名为mp3即可','Rename the text file to mp3'],['加背景音乐就算旁白完成','Background music alone completes the narration']],['文稿是声音的输入，不等于已经完成录制或合成。','A script is input for narration, not a completed recording or synthesis.']),
  6:q(['哪条反馈最能帮助判断节水信息是否表达清楚？','Which feedback best helps assess clarity of the water-saving message?'],[['观众能说明要做的动作和理由，并指出支持信息','A viewer can state the action, reason, and supporting information'],['观众只说配色好看','A viewer only praises the colors'],['文件尺寸比昨天更大','The file is larger than yesterday’s']],['要测理解，就询问观众理解到的内容；画面偏好和文件体积不是替代指标。','To assess comprehension, ask what was understood; aesthetics and file size are not substitutes.']),
  7:f(['本课最终短片的目标时长是15至___秒。','The target duration for this lesson’s final film is 15 to ___ seconds.'],[['30','30'],['60','60'],['90','90']],['在15–30秒内聚焦一个信息，并检查旁白与字幕节奏。','Focus on one message within 15–30 seconds and check narration and caption pacing.']),
  8:f(['记录“发现什么问题→改了什么→复查结果”，是在保存___。','Recording “problem → change → recheck result” preserves a ___.'],[['修改记录','revision record'],['素材许可','material license'],['工具白名单','tool allowlist']],['修改记录对应实际版本与观察，不能用泛泛的“优化了”替代。','Revision records tie to actual versions and observations, not generic claims of improvement.']),
  9:f(['对外发布前，事实、素材许可、隐私与AI说明都应逐项___。','Before public release, facts, permissions, privacy, and AI disclosure should each be ___.'],[['核对','checked'],['推测','guessed'],['省略','omitted']],['完成学习练习不替代发布检查或取得素材许可。','Completing the exercise does not replace release checks or grant material rights.']),
 12:m(['把本课作品材料与作用配对。','Match this lesson’s materials to their purpose.'],[
   [['核心信息与核实来源','Core message and verified sources'],['支持短片中的事实表述','Support the film’s factual claims']],
   [['连续画面','Coherent visuals'],['让动作和情境看得懂','Make action and context understandable']],
   [['旁白与字幕','Narration and captions'],['让重点听得清、读得懂','Make key information audible and readable']],
   [['两次具体修改记录','Two specific revision records'],['说明如何根据问题改善作品','Explain improvements made in response to problems']]]),
 14:m(['把作品尚缺的部分与下一步配对。','Match missing pieces to next steps.'],[
   [['只有分镜文字，没有制作画面','Only a written storyboard, no produced visuals'],['用生成或剪辑工具把分镜做出来','Produce the storyboard with generation or editing tools']],
   [['成片42秒，超出本课目标时长','Film is 42 seconds, beyond the lesson target'],['删重复内容，重新检查15–30秒版本','Remove repetition and check a 15–30-second version']],
   [['已有成片，没有上传作品记录','Film exists but no work record is uploaded'],['上传成片或能展示完成结果的截图','Upload the film or screenshots demonstrating the finished result']],
   [['引用数字，却找不到原始依据','A quoted number has no traceable evidence'],['核实来源或移除无法支持的断言','Verify the source or remove the unsupported claim']]]),
 },
 '3-1':{
  2:q(['本课简化模型中，视觉编码器主要做什么？','What does the vision encoder do in this lesson’s simplified model?'],[['把图像信息转换为可供后续处理的特征表示','Convert image information into features for later processing'],['把所有图片先转写为完整文字再删除原图','Transcribe every image entirely into text and discard the image'],['根据授权条款判断图片能否公开','Determine publication permission from license terms']],['编码提供图像表示；它不是完整文字转写或素材授权检查的同义词。','Encoding creates image representations; it is not synonymous with transcription or license checking.']),
  6:q(['回答说招牌是“出口”，清晰原图可读出“入口”。如何核对？','The answer says Exit; the clear source sign reads Entrance. What should you do?'],[['依据原图纠正读数，保留位置和对照记录','Correct it from the source and retain the location and comparison'],['更相信流畅解释，因为它包含更多上下文','Trust the fluent explanation because it has more context'],['把入口和出口一起写入，称为两个事实','Report both Entrance and Exit as facts']],['回答必须与原图可见文字相符；流畅或篇幅不能替代证据。','The answer must match visible source text; fluency and length do not replace evidence.']),
  8:f(['图像的视觉表示要与语言建立对应，本课把这种对应关系的学习叫图文___。','Learning correspondence between visual representations and language is called image-text ___.'],[['对齐','alignment'],['裁切','cropping'],['采样','sampling']],['这里的对齐指图文表示的联系，不等于核实每条事实。','Here alignment connects image and text representations; it does not verify every fact.']),
 12:m(['把图像理解步骤与它的直接作用配对。','Match image-processing stages to their direct role.'],[
   [['在本课模型中切成 Patch','Divide into patches in this model'],['把画面分成局部输入块','Divide the image into local input blocks']],
   [['形成视觉表示','Form visual representations'],['把图像信息变成可计算的向量','Represent image information as computable vectors']],
   [['学习图文对应','Learn image-text correspondence'],['连接视觉特征与语言描述','Connect visual features with language descriptions']],
   [['对照原图核验回答','Verify the answer against the original'],['检查描述是否符合可见证据','Check whether descriptions match visible evidence']]]),
 13:m(['把读图记录中的内容与栏目配对。','Match image-reading record entries to fields.'],[
   [['“AI把入口读成出口”','“AI read Entrance as Exit”'],['模型输出与原图差异','Difference between output and source']],
   [['“图片右上角招牌”','“Sign at the upper right”'],['核对位置','Verification location']],
   [['“我拍摄且不含个人信息”','“My photo with no personal information”'],['图片来源与使用依据','Image source and basis for use']],
   [['“远处小字看不清，请提供清晰原图”','“Distant text is unreadable; request the clear original”'],['不确定项与下一步','Uncertainty and next action']]]),
 },
 '3-3':{
  1:q(['扩散生成中的 Seed 控制什么？','What does Seed control in diffusion generation?'],[['随机数的起点','The random starting point'],['去噪迭代次数','The number of denoising iterations'],['输出画布的像素尺寸','The output canvas dimensions']],['它与 Steps、尺寸是不同设置；不是输出文件的流水号。','It differs from steps and dimensions; it is not an output filename counter.']),
  2:q(['要检查 Steps 的影响，哪组实验条件合适？','Which design tests the effect of Steps?'],[['固定模型、提示、尺寸、Seed和CFG，只改Steps','Fix model, prompt, dimensions, Seed, and CFG; vary Steps only'],['固定Steps，每次改Seed','Fix Steps and vary Seed'],['固定Seed，同时改Steps和提示主体','Fix Seed but vary Steps and the prompt subject']],['只改变待测设置，保留各次结果；这不保证输出只改变某种细节。','Vary the target setting and retain outputs; this does not guarantee changes only to one visual feature.']),
  3:q(['使用支持 CFG 的扩散工具时，提高 CFG 应怎样理解？','How should higher CFG be understood in a diffusion tool that supports it?'],[['改变提示引导强度，过高可能增加伪影，需要对照测试','It changes prompt guidance; excessive values may add artifacts, so compare results'],['数值越高，画面事实就越准确','Higher values always make depicted facts more accurate'],['数值越高，生成就越不受提示影响','Higher values always make generation less influenced by the prompt']],['引导强度不是事实准确率，也不是越大越好。','Guidance strength is neither factual accuracy nor something to maximize unconditionally.']),
  6:q(['结果忽好忽坏，怎样建立可比较的基线？','How can you establish a baseline when outputs vary?'],[['记录模型与所有可用设置，同设置多次运行，再只改一个变量','Record model and available settings, repeat a baseline, then vary one factor'],['只保存最好一张，作为所有设置的代表','Keep only the best output as representative of all settings'],['每次都换主题，观察总能否得到好图','Change the topic every time and see if any image looks good']],['基线帮助区分随机波动与改动效果；工具不提供某个设置时应注明。','A baseline helps separate variation from the tested change; note controls the tool does not expose.']),
  7:f(['扩散模型在生成时通过逐步___形成图像。','During generation, a diffusion model forms an image through progressive ___.'],[['去噪','denoising'],['OCR转写','OCR transcription'],['图文检索','image-text retrieval']],['训练学到如何去噪，生成时应用这些步骤；有些模型在潜空间而非直接在像素上操作。','Training learns denoising, which is applied during generation; some models operate in latent space rather than directly on pixels.']),
  8:f(['固定其他条件，只改变一个设置做对照，叫___实验。','Holding other conditions fixed while changing one setting is a ___ experiment.'],[['单变量','single-variable'],['多变量同时修改','simultaneous multi-variable'],['只挑最佳结果','best-result-only']],['一次改多项无法单独归因；只挑最好结果会引入选择偏差。','Changing several factors prevents isolated attribution; selecting only the best introduces selection bias.']),
 10:q(['你想验证 Steps 是否影响边缘断裂。哪组记录最有信息量？','You want to test Steps against broken edges. Which record is most informative?'],[['其余设置固定，记录20/30/40步的边缘完整性与耗时','Keep other settings fixed; record edge integrity and runtime at 20/30/40 steps'],['只记录三个输出文件名，不保留设置','Keep three filenames without settings'],['每组改不同主体，再按好看程度排序','Change subjects across groups and rank aesthetic appeal']],['这是对一个原因假设的测试，边缘问题不一定由步数导致。','This tests a hypothesis; a broken edge is not necessarily caused by step count.']),
 12:m(['工具支持下列控件时，把它们与作用配对。','For a tool supporting these controls, match each to its role.'],[
   [['Seed','Seed'],['控制随机起点','Control the random starting point']],
   [['Steps','Steps'],['设置去噪迭代次数','Set denoising iterations']],
   [['CFG','CFG'],['调整条件引导强度','Adjust conditioning guidance strength']],
   [['图像尺寸','Image dimensions'],['指定输出画布的宽和高','Specify output canvas width and height']]]),
 14:m(['把记录缺陷与它造成的具体限制配对。','Match record defects to their limitations.'],[
   [['一轮同时改Steps和CFG','Change Steps and CFG together'],['不能把差异单独归因给Steps','Cannot attribute the difference to Steps alone']],
   [['工具支持Seed却未记录','Seed is supported but not recorded'],['缺少复现随机起点的信息','Missing information for reproducing the random start']],
   [['只保留成功样本','Retain successes only'],['掩盖失败频率','Conceal the frequency of failures']],
   [['没有记录运行耗时','Runtime is not recorded'],['无法比较时间成本','Cannot compare time cost']]]),
 15:m(['把误解与对应限定配对。','Match misconceptions to qualifications.'],[
   [['Steps越大质量必定越好','More Steps guarantees better quality'],['改善可能有限，计算时间通常仍会增加','Gains may be limited while computation time usually increases']],
   [['CFG越大就越符合所有要求','Higher CFG meets every requirement better'],['过强引导也可能引入伪影','Excessive guidance may introduce artifacts']],
   [['相同Seed就能跨模型完全复现','Matching Seed reproduces across models exactly'],['模型、设置与实现也会影响结果','Model, settings, and implementation also affect the result']],
   [['潜空间就是图片文件压缩包','Latent space is an image archive file'],['它是模型处理图像特征的一种表示空间','It is a representation space for image features']]]),
 },
 '3-4':{
  3:q(['只想改图内杯子的阴影，工具同时提供 inpaint 和 outpaint。先选哪个？','To edit a cup’s shadow inside the image, a tool offers inpaint and outpaint. Which first?'],[['用inpaint选中阴影区域，再检查未选区','Inpaint the shadow region, then check unselected areas'],['用outpaint扩展画面边界','Outpaint beyond the image boundaries'],['先改变整幅图的风格再找阴影','Change the whole image’s style before inspecting the shadow']],['局部重绘针对图内区域；扩图主要处理边界外的新内容。','Inpainting targets interior regions; outpainting adds content outside the bounds.']),
  4:q(['V2同时改景别、色温与背景，结果变差。能否确定是哪一项导致？','V2 changes framing, color temperature, and background and looks worse. Can you isolate the cause?'],[['不能，需回到可比较版本逐项对照','No; return to a comparable version and test factors separately'],['能，最后写进提示的背景一定是原因','Yes; the last prompt change, background, must be responsible'],['能，颜色变化总比构图变化重要','Yes; color changes always dominate framing changes']],['同时改变多项引入混杂，改动顺序不能证明因果。','Multiple changes confound attribution; prompt order does not prove causation.']),
  5:q(['想把整个杯子换成水壶，但蒙版只覆盖杯口，杯身仍保留。下一步怎样调整更贴近目标？','You want to replace a whole cup with a jug, but the mask covers only its rim and the cup body remains. What adjustment best fits the goal?'],[['覆盖完整杯子及水壶所需的邻近区域，避开人物，再核对整图','Cover the whole cup and nearby space needed for the jug, avoid the person, then inspect the whole image'],['继续只框杯口，把人物也换成另一种画风','Keep masking only the rim and change the person to a different style'],['把整张图都选中，不再写需要保留的内容','Mask the entire image and omit the preservation requirements']],['范围过小也可能漏掉需要修改的部分。蒙版应覆盖目标所需区域，而不是一味越小越好；其他区域仍需检查。','A mask can also be too small for the intended edit. Cover the area the target requires rather than always minimizing it, and still inspect the rest of the image.']),
  6:q(['哪条版本记录最便于复查一次改动？','Which version record best supports reviewing a change?'],[['v1→v2只缩小杯子蒙版；附前后图，记录脸是否变化','v1→v2 only shrinks the cup mask; attach before/after and record any face change'],['v2更好看，之后继续修改','v2 looks better; keep editing'],['v2导出成功，文件名为final','v2 exported successfully with the filename final']],['版本、唯一改动与实际观察一起，才能把判断对应到结果。','Version, isolated change, and actual observations connect judgments to evidence.']),
  8:f(['要在原图边界外补充画面，通常使用___。','To generate content beyond the original image bounds, use ___.'],[['outpaint','outpaint'],['inpaint','inpaint'],['OCR','OCR']],['outpaint扩展边界，inpaint修改内部，OCR读取字符。','Outpainting extends bounds, inpainting edits inside, and OCR reads characters.']),
  9:f(['为比较一个修改的影响，每轮先采用___改动并记录结果。','To compare one edit’s effect, start with a ___ change each round and record results.'],[['单变量','single-variable'],['多变量','multi-variable'],['未记录的随机','random unrecorded']],['控制条件有助归因，随机生成仍可能波动，需要保留并复查输出。','Controlled conditions help attribution, but random generation can still vary; retain and recheck outputs.']),
 12:m(['把提示或编辑方式与其目的配对。','Match prompting or editing methods to their purpose.'],[
   [['正向提示：学生伸手关水龙头','Positive prompt: a student reaches to close the tap'],['说明希望出现的主体与动作','Describe desired subject and action']],
   [['负向提示：避免重复手指（工具支持时）','Negative prompt: avoid duplicate fingers, if supported'],['说明希望避开的内容，但不保证排除','Describe undesired content without guaranteeing exclusion']],
   [['inpaint','inpaint'],['对图内指定区域生成修改','Generate edits in a specified interior region']],
   [['outpaint','outpaint'],['在原边界之外生成内容','Generate content beyond original bounds']]]),
 13:m(['把具体待检查项与对应动作配对。','Match specific checks to corresponding actions.'],[
   [['要确认脸是否保持','Check whether the face was preserved'],['前后并排对照五官与脸型','Compare facial features and shape side by side']],
   [['要确认阴影与既定光源一致','Check shadows against the specified light source'],['核对阴影朝向与光源方向','Compare shadow and light directions']],
   [['要追踪哪一版引入额外物体','Trace which version introduced an extra object'],['按版本记录逐版比较','Compare versions using their records']],
   [['要确认扩图没有截断主体','Check that an extension did not truncate the subject'],['检查新画布的主体边界与位置','Inspect subject boundaries and position on the new canvas']]]),
 14:m(['把检查对象与主要维度配对。','Match checks to their primary dimension.'],[
   [['脸型与服装是否延续','Whether face and clothing are preserved'],['角色身份','Character identity']],
   [['节水操作与画面事实是否相符','Whether the water-saving action matches depicted facts'],['内容正确性','Content correctness']],
   [['笔触与色调是否统一','Whether brushwork and palette are coherent'],['视觉风格','Visual style']],
   [['手是否接触到开关','Whether the hand contacts the handle'],['物体间的空间关系','Spatial relationship between objects']]]),
 15:m(['把误解与修正配对。','Match misconceptions to corrections.'],[
   [['参考图能自动修正事实','A reference automatically corrects facts'],['仍要核对内容依据','Verify factual evidence separately']],
   [['版本多就不需要记录','Many versions remove the need for records'],['保留每版改动便于追踪','Keep each change for traceability']],
   [['局部修改保证其他地方不变','Local editing guarantees no changes elsewhere'],['应检查未选中的区域','Inspect unselected areas']],
   [['负向提示写了就绝不会出现','A negative prompt guarantees exclusion'],['控制效果有限，需要检查输出','Control is imperfect; inspect the output']]]),
 },
};
