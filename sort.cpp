#include <bits/stdc++.h>
#define ll long long
using namespace std;
vector<ll>a;
int cnt=0;
int main() {
	int x;
	while(cin>>x) {
		a.push_back(x); 
		cnt++;
	} 
	sort(a.begin(), a.end());
	for(int i=0;i<cnt;i++) cout<<a[i]<<" ";
	
}
