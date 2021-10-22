package co.com.sofka.questions.usecases;

import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.reposioties.AnswerRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;

@SpringBootTest
class DeleteAnswerUseCaseTest {
    @SpyBean
    DeleteAnswerUseCase deleteAnswerUseCase;

    @MockBean
    AnswerRepository answerRepository;

    @Test
    @DisplayName("Eliminar pregunta.")
    void deleteTest(){
        var answerDTO = new AnswerDTO("01","01","u01","test");

        Mockito.when(answerRepository.deleteById(answerDTO.getId())).thenReturn(Mono.empty());

        var dataEmpty = deleteAnswerUseCase.apply(answerDTO.getId()).thenReturn(Mono.empty());

        Assertions.assertEquals(dataEmpty.block(),Mono.empty());
    }
}

