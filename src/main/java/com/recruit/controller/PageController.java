package com.recruit.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class PageController {
	@RequestMapping("doIndexUI")
	public String doIndexUI() {
		return "index";
	}

	@RequestMapping("doPageUI")
	public String doPageUI(){
		 return "common/page";
	}

	@RequestMapping("{page}")
	public String doModule(@PathVariable String page) {
		return page;
	}
	
	@RequestMapping("sys/{page}")
	public String doModule2(@PathVariable String page) {
		return "sys/"+page;
	}
	
	@RequestMapping("sys/{page1}/{page}")
	public String doModule3(@PathVariable String page,@PathVariable String page1) {
		return "sys/"+page1+"/"+page;
	}
	
	@RequestMapping("job/{page}")
	public String doModule4(@PathVariable String page) {
		return "job/"+page;
	}
}
