G.AddData({
name:'Sapientcy',
author:'CX61',
desc:'And what do you know, mod has to evolve.Required to play Homosapient legacy 0.4 and later versions.',
engineVersion:1,
manifest:'0',
sheets:{'H1sheet':'https://file.garden/ZGd4-WLYvB6VkIdj/img/H1sheet.png'},
func:function(){

G.parse=function(what)
{
	var str='<div class="par">'+((what
	.replaceAll(']s',',*PLURAL*]'))
	.replace(/\[(.*?)\]/gi,G.parseFunc))
	.replaceAll('http(s?)://','http$1:#SLASH#SLASH#')
	.replaceAll('//','</div><div class="par">')
	.replaceAll('#SLASH#SLASH#','//')
	.replaceAll('@','</div><div class="par bulleted">')
	.replaceAll('<>','</div><div class="divider"></div><div class="par">')+'</div>';
	return str;
}
	}})