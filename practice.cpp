#include <bits/stdc++.h>
using namespace std;

// 演示程序：读入 n 和 n 个整数，输出最大值与总和
int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
4
    int mx = *max_element(a.begin(), a.end());
    long long sum = accumulate(a.begin(), a.end(), 0LL);

    cout << "max = " << mx << ", sum = " << sum << endl;
    return 0;
}
