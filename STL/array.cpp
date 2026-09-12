#include <bits/stdc++.h>
using namespace std;
array<int, 999> a;

int main() {
	int t;
	cin >> t;
	for(int i = 0; i < t; i++) {
		int x;
		cin >> x;
		a[i] = x;
	}
	// 迭代器（begin end rbegin rend）
	sort(a.begin(), a.end(), [](int x, int y) {
		return x>y;
	});
	for(int i = 0; i < t; i++) {
		cout<<a[i]<<" ";
	}

	/*
	cout << arr.front(); //第一个元素 arr[0]
	cout << arr.back();  //最后一个元素 arr[5]

	cout << arr.size();      // 6，元素个数
	cout << arr.max_size();  //和size一样，array大小固定
	cout << arr.empty();     //是否为空，只有array<T,0>才true

	arr.fill(0); //全部元素置0 （类似memset）

	array<int,3> p{1,1,1};
	array<int,3> q{2,2,2};
	p.swap(q);
	// std::swap(p,q); 也可以
	
	
	*/
	return 0;
}

