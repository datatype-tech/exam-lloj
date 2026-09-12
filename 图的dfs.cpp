#include <bits/stdc++.h>
#define ll long long
using namespace std;

const int MAXN = 1e6 + 10;
vector<int> e[MAXN];
bool vis[MAXN];  

void dfs(int u)
{
    vis[u] = true;
    cout << u << " ";   
    for(int v : e[u])
    {
        if(!vis[v]){
            dfs(v);
        }
    }
}

int main() 
{
    int n;
    cin >> n;
    for(int i = 1; i <= n; i++)
    {
        int a, b;
        cin >> a >> b;
        e[a].push_back(b);
        e[b].push_back(a); 
    }
    dfs(1);
    return 0;
}

