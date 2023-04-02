File = open('entrada.txt', 'r')
List = File.readlines()
Processos = 0
Recursos = 0
Existentes = []
Disponiveis = []
Alocacao = []
Requisicao = []

for i in range(len(List)):
  Row = List[i].split()

  if i == 0:
    Processos = int(Row[0])
    Recursos = int(Row[1])
      
  elif i == 2:
    for j in range(Recursos):
      Existentes.append(int(Row[j]))
      
  elif i == 4:
    for j in range(Recursos):
      Disponiveis.append(int(Row[j]))
      
  elif i >= 6 and i < (6 + Processos):
    Vetor = []
    for j in range(Recursos):
      Vetor.append(int(Row[j]))
    Alocacao.append(Vetor)
      
  elif i >= (7 + Processos) and i < (7 + (Processos*2)):
    Vetor = []
    for j in range(Recursos):
      Vetor.append(int(Row[j]))
    Requisicao.append(Vetor)

print(Processos, Recursos)
print()
print(Existentes)
print()
print(Disponiveis)
print()
for i in range(Processos): print(Alocacao[i])
print()
for i in range(Processos): print(Requisicao[i])

print()

for k in range(Processos):
  Vetor = ["Todos os processos foram finalizados"]
  for i in range (Processos): 
    for j in range (Recursos): 
        if Disponiveis[j] >= Requisicao[i][j]:
          Alocacao[i][j] = Alocacao[i][j] + Requisicao[i][j]
          Disponiveis[j] = Disponiveis[j] - Requisicao[i][j]
          Requisicao[i][j] = 0
          Disponiveis[j] = Disponiveis[j] + Alocacao[i][j]
          Alocacao[i][j] = 0
        elif Disponiveis[j] <  Requisicao[i][j] and Requisicao[i][j] != 0:
          texto = "O Processo P", i+1 ," está em espera aguardando ", Requisicao[i][j], " de R", j+1
          Vetor.append(texto)

if len(Vetor) > 1:
  del(Vetor[0])

for i in range(len(Vetor)): print(Vetor[i])
print()

print(Disponiveis)
print()
for i in range(Processos): print(Alocacao[i])
print()
for i in range(Processos): print(Requisicao[i])

print()
