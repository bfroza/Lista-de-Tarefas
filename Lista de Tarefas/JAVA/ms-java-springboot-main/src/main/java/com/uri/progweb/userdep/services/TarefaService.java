package com.uri.progweb.userdep.services;

import com.uri.progweb.userdep.entities.Tarefa;
import com.uri.progweb.userdep.exceptions.TarefaNotFoundException;
import com.uri.progweb.userdep.repositories.TarefaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TarefaService {

    @Autowired
    private TarefaRepository repository;

    public List<Tarefa> findAll() {
        return repository.findAll();
    }

    public Tarefa findById(Long id) {
        Optional<Tarefa> result = repository.findById(id);
        if (result.isPresent()) {
            return result.get();
        }

        throw new TarefaNotFoundException();
    }

    public Tarefa create(Tarefa tarefa) {
        return repository.save(tarefa);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Tarefa update(Long id, Tarefa newTarefa) {
        Tarefa currentTarefa = findById(id);
        currentTarefa.setDescricao(newTarefa.getDescricao());
        currentTarefa.setCriacao(newTarefa.getCriacao());
        currentTarefa.setLimite(newTarefa.getLimite());
        currentTarefa.setFinalizada(newTarefa.isFinalizada());
        Tarefa tarefa = repository.save(currentTarefa);
        return tarefa;
    }

    public Tarefa updateStatus(Long id, boolean finalizada) {
        Tarefa currentTarefa = findById(id);
        currentTarefa.setFinalizada(finalizada);
        Tarefa tarefa = repository.save(currentTarefa);
        return tarefa;
    }
}
