function fuck(x) {
	return function(j) {
		return x+j;
	}
}

var add4 = fuck(4);
add4(6);